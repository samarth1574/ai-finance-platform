"use client";

import { useState } from "react";
import { Sparkles, Loader2, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { generateAutomatedInsights } from "@/actions/ai-insights";
import { toast } from "sonner";

export function AiInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const response = await generateAutomatedInsights();
      if (response.success) {
        setInsights(response.insights);
      } else {
        toast.error(response.error || "Failed to load insights");
      }
    } catch (error) {
      toast.error("An error occurred while fetching insights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="fin-card border-none shadow-sm relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2" />
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold font-heading flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            Automated Insights
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchInsights} 
            disabled={loading}
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800/50 dark:text-indigo-300 dark:hover:bg-indigo-900/20"
          >
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <TrendingUp className="h-4 w-4 mr-2" />}
            {insights.length > 0 ? "Refresh" : "Analyze My Data"}
          </Button>
        </div>
        <CardDescription className="text-muted-foreground mt-1">
          AI-powered analysis of your recent spending patterns and financial health.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {insights.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Lightbulb className="h-10 w-10 mb-3 text-muted-foreground/30" />
            <p className="text-sm">Click the button above to generate personalized financial insights.</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400 mb-3" />
            <p className="text-sm">Gemini is analyzing your finances...</p>
          </div>
        ) : (
          <ul className="space-y-4 mt-2">
            {insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-3 bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800/50">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-primary text-white flex items-center justify-center text-xs font-bold mt-0.5 shadow-inner">
                  {i + 1}
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">{insight}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
