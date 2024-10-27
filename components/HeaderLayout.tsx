"use client";

import * as React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';

export default function HeaderLayout() {
    const pathname = usePathname();

    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    const formatSegment = (segment: string) => {
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b w-full sticky top-0 bg-white z-50">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1 block md:hidden" />
                <Separator orientation="vertical" className="mr-2 h-4 block md:hidden" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {pathSegments.map((segment, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <BreadcrumbSeparator className="hidden md:block" />
                                )}
                                <BreadcrumbItem>
                                    {index !== pathSegments.length - 1 ? (
                                        <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join('/')}`} className="font-medium">
                                            {formatSegment(segment)}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage className="font-medium">
                                            {formatSegment(segment)}
                                        </BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
