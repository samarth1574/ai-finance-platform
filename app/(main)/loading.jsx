import { Skeleton } from "@/components/ui/skeleton";

export default function MainLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Skeleton className="h-10 w-[250px]" />
      <div className="fin-card p-6 space-y-4">
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  );
}
