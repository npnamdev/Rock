import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CoursesManagePage() {
    return (
        <div className="p-4">
            <Tabs defaultValue="single-plan" className="w-full">
                <div className="flex flex-col-reverse md:flex-row justify-between mb-4 gap-2">
                    <TabsList className="grid max-w-[800px] grid-cols-3">
                        <TabsTrigger value="single-plan" className="font-semibold">Single Plan</TabsTrigger>
                        <TabsTrigger value="combo-plan" className="font-semibold">Combo Plan</TabsTrigger>
                        <TabsTrigger value="membership" className="font-semibold">Membership</TabsTrigger>
                    </TabsList>
                    <div className="hidden md:flex">
                        <Button>Add courses</Button>
                    </div>
                </div>
                <TabsContent value="single-plan">
                    <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2">
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                    </div>
                </TabsContent>
                <TabsContent value="combo-plan">
                    <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2">
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                    </div>
                </TabsContent>
                <TabsContent value="membership">
                    <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2">
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                        <Skeleton className="h-[150px] w-full aspect-video rounded-xl bg-muted" />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
