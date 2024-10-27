"use client";

import * as React from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleHelp, BadgeCheck, Bell, BookOpen, UsersRound, ChevronRight, ChevronsUpDown, ShoppingCart, CreditCard, Folder, Forward, SlidersVertical, ChartBarDecreasing, LogOut, GitBranch, MoreHorizontal, SwatchBook, Package, Settings, Sparkles, LayoutGrid, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";

const data = {
  user: { name: "shadcn", email: "m@example.com", avatar: "/avatars/shadcn.jpg" },
  navMain: [
    {
      title: "Statistical",
      url: "/manage",
      icon: LayoutGrid,
    },
    {
      title: "Content Management",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Courses", url: "/manage/courses" },
        { title: "Quizzes", url: "/manage/quizzes" },
        { title: "Surveys", url: "/manage/surveys" },
        { title: "Access Codes", url: "/manage/access-codes" },
        { title: "Tags", url: "/manage/tags" },
        { title: "Topics", url: "/manage/topics" },
      ],
    },
    {
      title: "Account Management",
      url: "#",
      icon: UsersRound,
      items: [
        { title: "User Accounts", url: "/manage/user-accounts" },
        { title: "Roles and Permissions", url: "/manage/roles-permissions" },
        { title: "Account Groups", url: "/manage/account-groups" },
      ],
    },
    {
      title: "Sales Management",
      url: "#",
      icon: ShoppingCart,
      items: [
        { title: "Order List", url: "/manage/order-list" },
        { title: "COD Management", url: "/manage/cod-management" },
        { title: "Process COD Orders", url: "/manage/process-cod-orders" },
      ],
    },
    {
      title: "Marketing Management",
      url: "#",
      icon: ChartBarDecreasing,
      items: [
        { title: "Promo Codes", url: "/manage/promo-codes" },
        { title: "Email Marketing", url: "/manage/email-marketing" },
        { title: "Popups", url: "/manage/popups" },
      ],
    },
    {
      title: "Affiliate Management",
      url: "#",
      icon: GitBranch,
      items: [
        { title: "Affiliate List", url: "/manage/affiliate-list" },
        { title: "Affiliate Payments", url: "/manage/affiliate-payments" },
      ],
    },
    {
      title: "Library Management",
      url: "#",
      icon: SwatchBook,
      items: [
        { title: "Books", url: "/manage/library/books" },
        { title: "Articles", url: "/manage/library/articles" },
        { title: "Videos", url: "/manage/library/videos" },
        { title: "Webinars", url: "/manage/library/webinars" },
        { title: "Resources", url: "/manage/library/resources" },
        { title: "Categories", url: "/manage/library/categories" },
      ],
    },
    {
      title: "Customer Support",
      url: "#",
      icon: CircleHelp,
      items: [
        { title: "Activation Code", url: "/manage/activation-code" },
        { title: "Transfer Code", url: "/manage/transfer-code" },
      ],
    },
  ],
  settings: [
    { name: "Display Settings", url: "/manage/display-settings", icon: SlidersVertical },
    { name: "System Settings", url: "/manage/system-settings", icon: Settings },
    { name: "Website Resources", url: "/manage/website-resources", icon: Package },
  ],
};


export default function Page() {
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const handleToggle = (title: string) => {
    setOpenSubmenu(prev => (prev === title ? null : title));
  };

  return (
    <SidebarProvider className="text-black font-semibold">
      <Sidebar collapsible="icon">
        <SidebarHeader className="px-5 bg-white flex justify-center h-[65px]">
          <SidebarMenu>
            <SidebarMenuItem>
              <Image src="/logo.svg" width={155} height={40} alt="Picture of the author" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-2 bg-white">
          <SidebarGroup>
            <SidebarGroupLabel className="font-bold uppercase">Overview</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                item.items && item.items.length > 0 ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    open={openSubmenu === item.title}
                    onOpenChange={() => handleToggle(item.title)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} className="text-black">
                          {item.icon && <item.icon color="#2a2727" strokeWidth={1.75} />}
                          <span>{item.title}</span>
                          <ChevronRight className={`ml-auto transition-transform duration-150 ${openSubmenu === item.title ? 'rotate-90' : ''}`} />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild className="text-black">
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="text-black">
                      <a href={item.url}>
                        {item.icon && <item.icon color="#2a2727" strokeWidth={1.75} />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="font-bold uppercase">Settings</SidebarGroupLabel>
            <SidebarMenu>
              {data.settings.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className="text-black">
                    <a href={item.url}>
                      <item.icon color="#2a2727" strokeWidth={1.75} />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Forward className="text-muted-foreground" />
                        <span>Share Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-2 bg-white border-t">
          <SidebarMenu className="">
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-black">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs text-black">
                        {data.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {data.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
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
        <div className="flex flex-1 flex-col gap-4 p-4 ">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Skeleton className="aspect-video rounded-xl bg-muted" />
            <Skeleton className="aspect-video rounded-xl bg-muted" />
            <Skeleton className="aspect-video rounded-xl bg-muted" />
          </div>
          <Skeleton className="min-h-[100vh] flex-1 rounded-xl bg-muted md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
