import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      {/* Overview Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="fin-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-8 w-[150px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeletons */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <div className="fin-card col-span-4 p-6 space-y-4 h-[400px]">
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-[300px] w-full" />
        </div>
        {/* Recent Transactions */}
        <div className="fin-card col-span-3 p-6 space-y-6 h-[400px]">
          <Skeleton className="h-6 w-[150px]" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-3 w-[80px]" />
                </div>
                <Skeleton className="h-4 w-[60px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
