"use client";

import * as React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';

export default function HeaderLayout() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    const currentPage = pathSegments[pathSegments.length - 1];

    const formatSegment = (segment: string) => {
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <header className="flex h-[60px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b w-full px-2 sticky top-0 bg-white z-50">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="block md:hidden" />
                <Separator orientation="vertical" className="mr-2 h-4 block md:hidden" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/manage">Manage</BreadcrumbLink>
                        </BreadcrumbItem>
                        {currentPage !== "manage" && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {formatSegment(currentPage)}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
