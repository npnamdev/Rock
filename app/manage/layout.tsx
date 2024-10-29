import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Menubar from "@/components/Menubar";
import HeaderLayout from "@/components/HeaderLayout";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="overflow-hidden">
                <SidebarProvider className="text-black font-semibold">
                    <Menubar />
                    <SidebarInset>
                        <HeaderLayout />
                        <div className="overflow-auto h-[calc(100vh-55px)] ">
                        {children}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    )
}