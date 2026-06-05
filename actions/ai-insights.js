"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateAutomatedInsights() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Fetch accounts
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      select: { name: true, balance: true, type: true },
    });

    // Fetch transactions from last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        date: { gte: thirtyDaysAgo },
      },
      select: { amount: true, type: true, category: true },
    });

    if (transactions.length === 0) {
      return {
        success: true,
        insights: [
          "You don't have any recent transactions to analyze.",
          "Start logging your expenses and income to get AI-powered insights.",
          "Set up a budget to stay on top of your financial goals."
        ]
      };
    }

    const totalIncome = transactions.filter(t => t.type === "INCOME").reduce((sum, t) => sum + t.amount.toNumber(), 0);
    const totalExpense = transactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount.toNumber(), 0);
    const netWorth = accounts.reduce((sum, a) => sum + a.balance.toNumber(), 0);

    const categoryBreakdown = transactions
      .filter(t => t.type === "EXPENSE")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount.toNumber();
        return acc;
      }, {});

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an expert financial advisor. Analyze the following data for a user over the last 30 days.
      Net Worth: ${netWorth}
      Total Income: ${totalIncome}
      Total Expenses: ${totalExpense}
      Category Breakdown of Expenses: ${JSON.stringify(categoryBreakdown)}

      Provide exactly 3 concise, actionable, and insightful bullet points (each under 20 words). 
      Format the response as a valid JSON array of 3 strings. Example: ["Insight 1", "Insight 2", "Insight 3"]
      Do not include any markdown formatting like \`\`\`json. Just the raw array.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Clean up potentially wrapped JSON
    const cleanJson = responseText.replace(/```(?:json)?\n?/g, "").replace(/```/g, "").trim();
    
    const insights = JSON.parse(cleanJson);

    return { success: true, insights };
  } catch (error) {
    console.error("Error generating insights:", error);
    return { success: false, error: "Failed to generate insights. Please try again later." };
  }
}
