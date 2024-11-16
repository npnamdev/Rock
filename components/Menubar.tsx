"use client";

import * as React from "react";
import Image from "next/image";
import { CircleHelp, BadgeCheck, Bell, BookOpen, UsersRound, ChevronRight, ChevronsUpDown, ShoppingCart, CreditCard, Folder, Forward, SlidersVertical, ChartBarDecreasing, LogOut, GitBranch, MoreHorizontal, SwatchBook, Package, Settings, Sparkles, LayoutGrid, Trash2, Palette } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const data = {
    user: { name: "Phương Nam", email: "root@domain.com", avatar: "https://lineone.piniastudio.com/images/avatar/avatar-6.jpg" },
    navMain: [
        {
            title: "Thống kê & Báo cáo",
            url: "/manage",
            icon: LayoutGrid,
        },
        {
            title: "Quản lý khoá học",
            url: "#",
            icon: BookOpen,
            items: [
                { title: "Danh sách khóa học", url: "/manage/courses" },
                { title: "Thể loại khoá học", url: "/manage/categories" },
                { title: "Thẻ khoá học", url: "/manage/tags" },
                { title: "Mã kích hoạt", url: "/manage/activate-course" },
            ],
        },
        {
            title: "Quản lý người dùng",
            url: "#",
            icon: UsersRound,
            items: [
                { title: "Danh sách người dùng", url: "/manage/user-accounts" },
                { title: "Nhóm người dùng", url: "/manage/account-groups" },
                { title: "Vai trò và phân quyền", url: "/manage/roles-permissions" },
            ],
        },
        {
            title: "Quản lý doanh thu",
            url: "#",
            icon: ShoppingCart,
            items: [
                { title: "Danh sách đơn hàng", url: "/manage/order-list" },
                { title: "Quản lý COD", url: "/manage/cod-management" },
                { title: "Xử lý đơn COD", url: "/manage/process-cod-orders" },
            ],
        },
        {
            title: "Chiến dịch quảng cáo",
            url: "#",
            icon: ChartBarDecreasing,
            items: [
                { title: "Mã khuyến mãi", url: "/manage/promo-codes" },
                { title: "Chiến dịch Email", url: "/manage/email-marketing" },
                { title: "Cửa Sổ Pop-up", url: "/manage/popups" },
            ],
        },
        {
            title: "Tiếp thị liên kết",
            url: "#",
            icon: GitBranch,
            items: [
                { title: "Danh sách đại lý", url: "/manage/affiliate-list" },
                { title: "Thanh toán đại lý", url: "/manage/affiliate-payments" },
            ],
        },
{
    title: "Tùy chỉnh giao diện",
    url: "#",
    icon: Palette, // Thay bằng biểu tượng phù hợp
    items: [
        { title: "Header", url: "/customize/header" },
        { title: "Hero Section", url: "/customize/hero" },
        { title: "Danh mục khóa học", url: "/customize/course-categories" },
        { title: "Danh sách khóa học", url: "/customize/course-list" },
        { title: "Giới thiệu", url: "/customize/about" },
        { title: "Testimonials", url: "/customize/testimonials" },
        { title: "Đối tác", url: "/customize/partners" },
        { title: "Footer", url: "/customize/footer" },
    ],
},
        {
            title: "Quản lý thư viện",
            url: "/manage/liblarys",
            icon: SwatchBook,
        },
        {
            title: "Trung tâm hỗ trợ",
            url: "#",
            icon: CircleHelp,
            items: [
                { title: "Mã kích hoạt", url: "/manage/activation-code" },
                { title: "Mã chuyển khoản", url: "/manage/transfer-code" },
            ],
        },
    ],
    settings: [
        { name: "Cài đặt hiển thị", url: "/manage/display-settings", icon: SlidersVertical },
        { name: "Cài đặt hệ thống", url: "/manage/system-settings", icon: Settings },
        { name: "Tài nguyên trang web", url: "/manage/website-resources", icon: Package },
    ],
};


import { useSidebar } from "@/components/ui/sidebar"

export default function Menubar() {
    const pathname = usePathname();
    const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()

    React.useEffect(() => {
        data.navMain.forEach((item) => {
            if (item.items) {
                const matchingItem = item.items.find((subItem) => pathname === subItem.url);
                if (matchingItem) {
                    setOpenSubmenu(item.title);
                }
            }
        });
    }, [pathname]);

    const handleToggle = (title: string) => {
        setOpenSubmenu(prev => (prev === title ? null : title));
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="px-5 bg-white flex justify-center h-[65px]">
                <SidebarMenu>
                    <SidebarMenuItem onClick={() => setOpenMobile(false)}>
                        <Link href="/manage">
                            <Image src="/logo.svg" width={155} height={40} alt="Picture of the author" />
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="px-2 bg-white gap-0">
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold uppercase mb-1">Overview</SidebarGroupLabel>
                    <SidebarMenu className="gap-1.5">
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
                                            <SidebarMenuButton tooltip={item.title} className={`text-black ${pathname == item.url ? 'bg-gray-100' : ''}`}>
                                                {item.icon && <item.icon color="#2a2727" strokeWidth={1.75} />}
                                                <span>{item.title}</span>
                                                <ChevronRight className={`ml-auto transition-transform duration-150 ${openSubmenu === item.title ? 'rotate-90' : ''}`} />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton onClick={() => setOpenMobile(false)} asChild className={`text-black ${pathname == subItem.url ? 'bg-gray-100' : ''}`}>
                                                            <Link href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton onClick={() => setOpenMobile(false)} asChild className={`text-black ${pathname == item.url ? 'bg-gray-100' : ''}`}>
                                        <Link href={item.url}>
                                            {item.icon && <item.icon color="#2a2727" strokeWidth={1.75} />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel className="font-bold uppercase mb-1">Settings</SidebarGroupLabel>
                    <SidebarMenu className="gap-1.5">
                        {data.settings.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton asChild className="text-black">
                                    <Link href={item.url}>
                                        <item.icon color="#2a2727" strokeWidth={1.75} />
                                        <span>{item.name}</span>
                                    </Link>
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
            <SidebarFooter className="px-3.5 bg-white border-t">
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
                                                PN
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
                                        Nâng cấp lên Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Tài khoản
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard />
                                        Thanh toán
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell />
                                        Thông báo
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut />
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
