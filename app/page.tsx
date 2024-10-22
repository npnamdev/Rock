"use client"

import * as React from "react"
import Link from "next/link";
import { BookOpen, Bot, ChartBar, ChevronRight, HelpCircle, Settings2, SquareTerminal, UserCheck, Settings } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Bảng Điều Khiển",
      url: "#",
      icon: SquareTerminal,
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
      isActive: true,
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
    {
      title: "Thống Kê",
      url: "#",
      icon: ChartBar,
      items: [
        { title: "Tổng Quan", url: "#" },
        { title: "Theo Khóa Học", url: "#" },
        { title: "Theo Học Viên", url: "#" },
      ],
    },
    {
      title: "Hỗ Trợ",
      url: "#",
      icon: HelpCircle,
      items: [
        { title: "Trung Tâm Hỗ Trợ", url: "#" },
        { title: "Liên Hệ", url: "#" },
      ],
    },
    {
      title: "Quản Lý Người Dùng",
      url: "#",
      icon: UserCheck,
      items: [
        { title: "Danh Sách Người Dùng", url: "#" },
        { title: "Thêm Người Dùng", url: "#" },
      ],
    },
  ],
  navSetting: [
    {
      title: "Cài đặt",
      url: "#",
      icon: Settings,
    },
    {
      title: "Đăng xuất",
      url: "#",
      icon: BookOpen,
    },
  ],
};

export default function Page() {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  return (
    <SidebarProvider className="grid grid-cols-[250px_auto] bg-transparent">
      <Sidebar className="bg-blue-500">
        <SidebarHeader className="px-6 h-[70px] flex justify-center border-b bg-transparent">
          <Image src="/logo.svg" width={145} height={40} alt="Picture of the author" />
        </SidebarHeader>
        <SidebarMenu className="border-r py-4 px-3.5 h-[calc(100%-170px)] gap-1.5 overflow-auto bg-transparent">
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.items.length > 0 ? (
                <Collapsible asChild open={openMenu === item.title} onOpenChange={(open) => {
                  setOpenMenu(open ? item.title : null);
                }} className="group/collapsible">
                  <div>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="text-black font-semibold">
                        {item.icon && <item.icon className="w-auto h-auto" size={28} strokeWidth={1.5} />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild className="text-black font-semibold">
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
                <SidebarMenuButton asChild className="text-black font-semibold">
                  <Link href={item.url}>
                    <item.icon size={10} strokeWidth={1.5} /> <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarFooter className="px-6 flex h-[100px] justify-center border-t bg-transparent">
          <SidebarMenu className="gap-1.5">
            {data.navSetting.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="text-black font-semibold">
                  <Link href={item.url}>
                    <item.icon size={10} strokeWidth={1.5} /> <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
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
