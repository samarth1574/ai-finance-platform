"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";
import { useCurrency } from "@/components/currency-provider";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;
  const { currency, convertAmount } = useCurrency();

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="fin-card group relative overflow-hidden border-none shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-110">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold capitalize text-foreground font-heading tracking-tight">
                {name}
              </CardTitle>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {type.charAt(0) + type.slice(1).toLowerCase()} Account
              </p>
            </div>
          </div>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-extrabold text-foreground font-heading tracking-tight">
            {currency.symbol}{convertAmount(balance)}
          </div>
          <p className="mt-1.5 text-sm font-medium text-muted-foreground">
            Current tracked balance
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm font-semibold">
          <div className="flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            Income
          </div>
          <div className="flex items-center rounded-lg bg-rose-50 px-2.5 py-1 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400">
            <ArrowDownRight className="mr-1 h-4 w-4" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
