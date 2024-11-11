import { BarChatDemo } from "@/components/BarChatDemo";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashBoardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 py-2 md:py-4 px-4">
      <div className="grid auto-rows-min gap-3 md:gap-4 grid-cols-2 md:grid-cols-4">
        <Skeleton className="aspect-video rounded-xl bg-white shadow border bg-white" />
        <Skeleton className="aspect-video rounded-xl bg-white shadow border bg-white" />
        <Skeleton className="aspect-video rounded-xl bg-white shadow border bg-white" />
        <Skeleton className="aspect-video rounded-xl bg-white shadow border bg-white" />
      </div>
      <BarChatDemo />
    </div>
  );
}
