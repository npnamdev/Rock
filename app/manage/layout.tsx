import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Menubar from "@/components/Menubar";
import HeaderLayout from "@/components/HeaderLayout";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <SidebarProvider className="text-black font-semibold">
                    <Menubar />
                    <SidebarInset>
                        <HeaderLayout />
                        {children}
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    )
}