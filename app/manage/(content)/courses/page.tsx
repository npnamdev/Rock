"use client";

import { useState, useEffect } from "react";
import { ComboboxDemo } from "@/components/ComboboxDemo";
import { CourseActionMenu } from "@/components/CourseActionMenu";
import { DrawerDemo } from "@/components/DrawerDemo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard, Copy, Database, Plus, ScanEye, Search, SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import axios from 'axios';
import { mutate } from "swr";
import { toast } from "sonner";
import slugify from 'slugify';
import copy from 'clipboard-copy';



export default function CoursesManagePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const fetcher = async (url: string): Promise<any> => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'An error occurred');
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        const handler = setTimeout(() => { setDebouncedSearchTerm(searchTerm); }, 500);
        return () => { clearTimeout(handler); };
    }, [searchTerm]);

    const { data, error, isLoading } = useSWR(
        `https://api.rock.io.vn/api/v1/courses?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`,
        fetcher, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    const courses: Course[] = data?.data;

    const handleDeleteItem = async (tagId: string) => {
        try {
            const res = await axios.delete(`https://api.rock.io.vn/api/v1/courses/${tagId}`);
            if (res) {
                mutate(`https://api.rock.io.vn/api/v1/courses?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`);
                toast.success("Xóa khóa học thành công", { description: res.data.createdAt });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const courseOptions = [
        { value: "all_courses", label: "Tất cả khóa học" },
        { value: "single_course", label: "Khóa đơn" },
        { value: "combo_course", label: "Khóa combo" },
        { value: "membership", label: "Membership" },
    ];

    const copyToClipboardById = (id: string) => {
        copy(`#${id}`).then(() => {
            toast.success(`Đã sao chép Id: ${id}`);
        }).catch((error) => {
            toast.error("Đã xảy ra lỗi khi sao chép.");
        });
    }

    const menuOptions = [
        {
            icon: <Clipboard size={16} strokeWidth={1.5} />,
            value: "copy",
            label: "Copy ID khóa học",
            action: (id: string) => copyToClipboardById(id)
        },
        {
            icon: <Copy size={16} strokeWidth={1.5} />,
            value: "duplicate",
            label: "Nhân bản khóa học",
            action: (id: string) => toast.error(`Tính năng đang được phát triển :))`)
        },
        {
            icon: <ScanEye size={16} strokeWidth={1.5} />,
            value: "details",
            label: "Chi tiết khóa học",
            action: (id: string) => toast.error(`Tính năng đang được phát triển :))`)
        },
        {
            icon: <SquarePen size={16} strokeWidth={1.5} />,
            value: "edit",
            label: "Chỉnh sửa khóa học",
            action: (id: string) => toast.error(`Tính năng đang được phát triển :))`)
        },
        {
            icon: <Trash size={16} strokeWidth={1.5} />,
            value: "delete",
            label: "Xóa khóa học",
            action: (id: string) => handleDeleteItem(id)
        },
    ];

    return (
        <div className="py-2 md:py-4 px-4">
            <div className="h-[60px] flex justify-between items-center px-4 bg-white rounded-md mb-3 shadow">
                <div className="flex items-center gap-2">
                    <div className="relative md:flex items-center hidden">
                        <Search className="absolute left-3 text-gray-600" size={18} strokeWidth={1.5} />
                        <Input className="w-[380px] px-5 pl-10" type="text" placeholder="Tìm kiếm khóa học..." />
                    </div>
                    <ComboboxDemo data={courseOptions} optionDefault="all_courses" />
                </div>
                <div className="flex items-center gap-2">
                    <Button className="lg:hidden" variant="outline" size="icon">
                        <Search />
                    </Button>
                    <DrawerDemo />
                </div>
            </div>
            <div>
                {isLoading ? (
                    <div className="flex h-[250px] bg-white w-full flex-col items-center gap-3 justify-center rounded-md border shadow-md font-bold text-sm">
                        <Database strokeWidth={1.5} className="text-gray-400" />
                        Đang tải...
                    </div>
                ) : courses?.length > 0 ? (
                    <div className="grid auto-rows-min gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
                        {
                            courses.map((course) => (
                                <div
                                    key={course._id}
                                    className="bg-white grid cursor-pointer grid-cols-[150px_auto_60px] md:grid-cols-[175px_auto_60px] items-center gap-2 rounded-md border shadow md:shadow-lg"
                                >
                                    <div className="m-2.5">
                                        <Image className="w-full rounded-lg shadow" src={course.image} width={180} height={120} alt={course.title} />
                                    </div>

                                    <div className="flex flex-col gap-1.5 text-sm">
                                        <h5 className="m-0 font-bold line-clamp-1">{course.title}</h5>
                                        <p className="m-0 line-clamp-1 md:line-clamp-2 text-gray-500">{course.description}</p>
                                        <p className="m-0">{course.price}</p>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <CourseActionMenu courseID={course._id} options={menuOptions} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex h-[250px] w-full flex-col items-center justify-center rounded-md border shadow-md font-bold text-sm">Không có khóa học nào</div>
                )}
            </div>
        </div>
    );
}
