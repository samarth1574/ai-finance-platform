"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getCurrentBudget(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const budget = await db.budget.findFirst({
      where: {
        userId: user.id,
      },
    });

    // Get current month's expenses
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const expenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        accountId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      budget: budget ? { ...budget, amount: budget.amount.toNumber() } : null,
      currentExpenses: expenses._sum.amount
        ? expenses._sum.amount.toNumber()
        : 0,
    };
  } catch (error) {
    console.error("Error fetching budget:", error);
    throw error;
  }
}

export async function updateBudget(amount) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Update or create budget
    const budget = await db.budget.upsert({
      where: {
        userId: user.id,
      },
      update: {
        amount,
      },
      create: {
        userId: user.id,
        amount,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      data: { ...budget, amount: budget.amount.toNumber() },
    };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { success: false, error: error.message };
  }
}

export async function autoSuggestBudget() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Fetch the last 30 days of expenses
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await db.transaction.findMany({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: { gte: thirtyDaysAgo },
      },
      select: {
        amount: true,
        category: true,
        date: true,
      },
    });

    if (expenses.length === 0) {
      return { success: true, budget: 1000 }; // Default fallback if no data
    }

    const totalExpense = expenses.reduce((sum, t) => sum + t.amount.toNumber(), 0);
    const categoryBreakdown = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount.toNumber();
      return acc;
    }, {});

    // Import Gemini inline to avoid top-level issues if not needed elsewhere
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a strict financial advisor. Analyze this user's spending from the last 30 days and recommend a realistic but slightly optimized monthly budget.
      Total spending: ${totalExpense}
      Category breakdown: ${JSON.stringify(categoryBreakdown)}
      
      Respond with ONLY a single numeric value representing the recommended total monthly budget (e.g. 5000). Do not include any text, currency symbols, or formatting.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Extract numbers from the response just in case the AI adds text
    const recommendedBudget = parseFloat(responseText.replace(/[^\d.-]/g, ''));

    if (isNaN(recommendedBudget)) {
      return { success: true, budget: Math.round(totalExpense * 1.05) }; // Fallback to 5% buffer
    }

    return { success: true, budget: Math.round(recommendedBudget) };
  } catch (error) {
    console.error("Error generating budget suggestion:", error);
    return { success: false, error: error.message };
  }
}

