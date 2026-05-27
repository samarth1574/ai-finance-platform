import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import { CurrencyDisplay } from "@/components/currency-display";
import { AiInsights } from "./_components/ai-insights";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  // Calculate Net Worth
  const totalBalance = accounts?.reduce((sum, account) => sum + account.balance, 0) || 0;
  
  // Calculate Monthly Income/Expense
  const currentDate = new Date();
  const currentMonthTransactions = transactions?.filter((t) => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === currentDate.getMonth() && tDate.getFullYear() === currentDate.getFullYear();
  }) || [];
  
  const monthlyIncome = currentMonthTransactions.filter(t => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpense = currentMonthTransactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      {/* Net Worth Hero Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="fin-card border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl col-span-1 md:col-span-3 lg:col-span-1">
          <CardContent className="p-8">
            <h2 className="text-sm font-medium text-slate-300 mb-2 uppercase tracking-wider font-heading">Total Net Worth</h2>
            <div className="text-4xl font-bold tracking-tight mb-6 font-heading">
              <CurrencyDisplay amount={totalBalance} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Income (This Month)</p>
                <p className="text-lg font-semibold text-emerald-400">
                  +<CurrencyDisplay amount={monthlyIncome} />
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Expenses (This Month)</p>
                <p className="text-lg font-semibold text-rose-400">
                  -<CurrencyDisplay amount={monthlyExpense} />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Progress takes up 2 columns in the top grid */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2">
          <div className="grid gap-6 lg:grid-cols-2">
            <BudgetProgress
              initialBudget={budgetData?.budget}
              currentExpenses={budgetData?.currentExpenses || 0}
            />
            <AiInsights />
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div>
        <h2 className="text-xl font-bold mb-4 font-heading text-slate-900 dark:text-white">Your Accounts</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="cursor-pointer border-dashed border-primary/30 bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg rounded-xl h-full">
              <CardContent className="flex h-full min-h-[160px] flex-col items-center justify-center pt-6 text-primary">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>
          {accounts.length > 0 &&
            accounts?.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>

      {/* Dashboard Overview */}
      <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
      />
    </div>
  );
}
