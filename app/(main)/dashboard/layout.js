import DashboardPage from "./page";
import { BarLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout() {
  return (
    <div className="px-5">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="section-kicker text-primary font-semibold tracking-wider uppercase mb-1">Overview</p>
          <h1 className="text-4xl font-extrabold text-foreground md:text-6xl font-heading tracking-tight">
          Dashboard
          </h1>
        </div>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="hsl(var(--primary))" />}
      >
        <DashboardPage />
      </Suspense>
    </div>
  );
}
