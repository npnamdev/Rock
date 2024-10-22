"use client"

import * as React from "react"
import Link from "next/link";
import { BookOpen, Bot, ChevronRight, Settings2, SquareTerminal } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Bảng Điều Khiển",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: "Khóa Học",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        { title: "Tất Cả Khóa Học", url: "#" },
        { title: "Thêm Khóa Học", url: "#" },
        { title: "Danh Mục", url: "#" },
      ],
    },
    {
      title: "Học Viên",
      url: "#",
      icon: Bot,
      items: [
        { title: "Tất Cả Học Viên", url: "#" },
        { title: "Đăng Ký", url: "#" },
        { title: "Báo Cáo", url: "#" },
      ],
    },
    {
      title: "Giảng Viên",
      url: "#",
      icon: SquareTerminal,
      items: [
        { title: "Tất Cả Giảng Viên", url: "#" },
        { title: "Thêm Giảng Viên", url: "#" },
        { title: "Báo Cáo", url: "#" },
      ],
    },
    {
      title: "Cài Đặt",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Chung", url: "#" },
        { title: "Thanh Toán", url: "#" },
        { title: "Thông Báo Email", url: "#" },
        { title: "Giới Hạn", url: "#" },
      ],
    },
  ],
};


export default function Page() {
  return (
    <SidebarProvider className="grid grid-cols-[250px_auto]">
      <Sidebar>
        <SidebarHeader className="px-6 h-[70px] flex justify-center border-b">
          header
        </SidebarHeader>
        <SidebarMenu className="border-r py-4 px-3.5 h-[calc(100%-140px)]">
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.items.length > 0 ? (
                <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
                  <div>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} className="text-black font-medium">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild className="text-black font-medium">
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ) : (
                <SidebarMenuButton asChild className="text-black font-medium">
                  <Link href={item.url}>
                    <item.icon /> <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarFooter className="px-6 h-[70px] flex justify-center border-t">
          sidebar footer
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
