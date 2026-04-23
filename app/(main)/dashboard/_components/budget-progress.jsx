"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, Sparkles, Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { useCurrency } from "@/components/currency-provider";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget, autoSuggestBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const { currency, convertAmount } = useCurrency();
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const {
    loading: isSuggesting,
    fn: suggestBudgetFn,
    data: suggestedBudget,
    error: suggestError,
  } = useFetch(autoSuggestBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleSuggestBudget = async () => {
    await suggestBudgetFn();
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (suggestedBudget?.success) {
      setNewBudget(suggestedBudget.budget.toString());
      toast.success("AI suggested a budget based on your spending!");
    }
  }, [suggestedBudget]);

  useEffect(() => {
    if (suggestError) {
      toast.error(suggestError.message || "Failed to generate budget suggestion");
    }
  }, [suggestError]);

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <Card className="fin-card overflow-hidden border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-base font-bold text-foreground font-heading tracking-tight">
            Monthly Budget (Default Account)
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2 flex-wrap">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Amount"
                  autoFocus
                  disabled={isLoading || isSuggesting}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading || isSuggesting}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading || isSuggesting}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSuggestBudget}
                  disabled={isLoading || isSuggesting}
                  className="ml-auto"
                >
                  {isSuggesting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
                  )}
                  Auto-Suggest
                </Button>
              </div>
            ) : (
              <>
                <CardDescription className="text-sm font-medium text-muted-foreground">
                  {initialBudget
                    ? `${currency.symbol}${convertAmount(currentExpenses)} of ${currency.symbol}${convertAmount(initialBudget.amount)} spent`
                    : "No budget set"}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className="space-y-3">
            <Progress
              value={percentUsed}
              extraStyles={`${
                // add to Progress component
                percentUsed >= 90
                  ? "bg-rose-500"
                  : percentUsed >= 75
                    ? "bg-amber-500"
                    : "bg-emerald-500"
              }`}
            />
            <p className="text-right text-xs font-semibold text-muted-foreground">
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
