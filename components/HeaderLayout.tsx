"use client";

import * as React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { usePathname } from 'next/navigation';
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "./ui/button";
import { AlignLeft } from "lucide-react";

export default function HeaderLayout() {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();

    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const segmentLabels: Record<string, string> = {
        "manage": "Quản lý",
        "courses": "Danh sách khóa học",
        "categories": "Danh mục khoá học",
        "tags": "Thẻ khoá học",
        "activate-course": "Mã kích hoạt",
        "user-accounts": "Danh sách người dùng",
        "account-groups": "Nhóm người dùng",
        "roles-permissions": "Vai trò và phân quyền",
        "promo-codes": "Mã khuyến mãi",
        "email-marketing": "Chiến dịch Email",
        "popups": "Cửa Sổ Pop-up",
        "liblarys": "Quản lý thư viện",
    };

    const formatSegment = (segment: string) => {
        return segmentLabels[segment] || segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <header className="flex h-[60px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b w-full px-2 sticky top-0 bg-white z-50">
            <div className="flex items-center gap-2 px-4">
                <Button className="w-8 h-8" variant="outline" size="icon" onClick={() => setOpenMobile(true)}>
                    <AlignLeft strokeWidth={1.5} />
                </Button>
                <Separator orientation="vertical" className="mr-2 h-4 block md:hidden" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/manage">{formatSegment("manage")}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {pathSegments.slice(1).map((segment, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {formatSegment(segment)}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
