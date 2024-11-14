import { BarChatDemo } from "@/components/BarChatDemo";
import { BarChatDemo2 } from "@/components/BarChatDemo2";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashBoardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 py-2 md:py-4 px-4">
      <div className="grid auto-rows-min gap-3 md:gap-4 grid-cols-2 md:grid-cols-4">
        <Skeleton className="aspect-video rounded-xl bg-white shadow border" />
        <Skeleton className="aspect-video rounded-xl bg-white shadow border" />
        <Skeleton className="aspect-video rounded-xl bg-white shadow border" />
        <Skeleton className="aspect-video rounded-xl bg-white shadow border" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2 lg:gap-4">
      <BarChatDemo />
      <BarChatDemo2 />
      </div>
    </div>
  );
}
