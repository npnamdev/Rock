import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Menubar from "@/components/Menubar";
import HeaderLayout from "@/components/HeaderLayout";
import { Toaster } from "@/components/ui/sonner";
import { Nunito } from "next/font/google";
const nunito = Nunito({ subsets: ["latin"] });

export default function ManageLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className={nunito.className} lang="en">
            <body className="overflow-hidden">
                <SidebarProvider className="text-black font-semibold">
                    <Menubar />
                    <SidebarInset className="bg-gray-100">
                        <HeaderLayout />
                        <div className="overflow-auto h-[calc(100dvh-60px)] ">
                        {children}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
                <Toaster />
            </body>
        </html>
    )
}