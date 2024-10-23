import { Skeleton } from "@/components/ui/skeleton";

export default function UserAccountsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Skeleton className="aspect-video rounded-xl bg-muted" />
                <Skeleton className="aspect-video rounded-xl bg-muted" />
                <Skeleton className="aspect-video rounded-xl bg-muted" />
            </div>
        </div>
    );
}
