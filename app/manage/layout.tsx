import * as React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Menubar from "@/components/Menubar";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <SidebarProvider className="text-black font-semibold">
                    <Menubar />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b sticky top-0 bg-white z-50">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1 block md:hidden" />
                                <Separator orientation="vertical" className="mr-2 h-4 block md:hidden" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="#" className="font-medium">
                                                Building Your Application
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage className="font-medium">Data Fetching</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </header>
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    )
}