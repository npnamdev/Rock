import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CoursesManagePage() {
    return (
        <div className="p-4">
            <Tabs defaultValue="single-plan" className="w-full">
                <div className="flex justify-between mb-4">
                    <TabsList className="grid w-[400px] grid-cols-3">
                        <TabsTrigger value="single-plan" className="font-semibold">Single Plan</TabsTrigger>
                        <TabsTrigger value="combo-plan" className="font-semibold">Combo Plan</TabsTrigger>
                        <TabsTrigger value="membership" className="font-semibold">Membership</TabsTrigger>
                    </TabsList>
                    <Button>Add courses</Button>
                </div>
                <TabsContent value="single-plan">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                    </div>
                </TabsContent>
                <TabsContent value="combo-plan">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                    </div>
                </TabsContent>
                <TabsContent value="membership">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[120px] w-full aspect-video rounded-xl bg-muted" />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
