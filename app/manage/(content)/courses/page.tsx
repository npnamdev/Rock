"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ComboboxDemo } from "@/components/ComboboxDemo";
import { CourseActionMenu } from "@/components/CourseActionMenu";
import { DrawerDemo } from "@/components/DrawerDemo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Plus, ScanEye, Search, SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import axios from 'axios';
import { mutate } from "swr";
import { toast } from "sonner";
import slugify from 'slugify';

const courseOptions = [
    { value: "all_courses", label: "Tất cả khóa học" },
    { value: "free_courses", label: "Khóa học miễn phí" },
    { value: "paid_courses", label: "Khóa học trả phí" },
    { value: "popular_courses", label: "Khóa học phổ biến" },
    { value: "new_courses", label: "Khóa học mới" },
];

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

    const handleDeleteTag = async (tagId: string) => {
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

    const menuOptions = [
        {
            icon: <Copy size={16} strokeWidth={1.5} />,
            value: "duplicate",
            label: "Nhân bản",
            action: (userGroupId: string) => console.log("Duplicate clicked", userGroupId)
        },
        {
            icon: <ScanEye size={16} strokeWidth={1.5} />,
            value: "details",
            label: "Chi tiết",
            action: (userGroupId: string) => console.log("Details clicked", userGroupId)
        },
        {
            icon: <SquarePen size={16} strokeWidth={1.5} />,
            value: "edit",
            label: "Chỉnh sửa",
            action: (userGroupId: string) => console.log("Update clicked", userGroupId)
        },
        {
            icon: <Trash size={16} strokeWidth={1.5} />,
            value: "delete",
            label: "Xóa",
            action: (tagId: string) => handleDeleteTag(tagId)
        },
    ];

    return (
        <div className="py-2 md:py-4 px-4">
            <div className="h-[60px] flex justify-between items-center px-4 bg-white rounded-md mb-3 shadow">
                <div className="flex items-center gap-2">
                    <div className="relative md:flex items-center hidden">
                        <Search className="absolute left-3 text-gray-600" size={18} strokeWidth={1.5} />
                        <Input className="w-[340px] px-5 pl-10" type="text" placeholder="Tìm kiếm khóa học..." />
                    </div>
                    <DrawerDemo />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-full h-full sm:rounded-none border">
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <ComboboxDemo data={courseOptions} optionDefault="all_courses" />
                </div>
                <div className="flex items-center gap-2">
                    <Button className="border flex gap-1 px-3 font-semibold text-[13.5px]">
                        <Plus size={15} color="#fff" /> <span className="hidden md:flex"> Thêm khóa học </span>
                    </Button>
                </div>
            </div>
            <div className="grid auto-rows-min gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
                {isLoading ? (
                    <p>Đang tải...</p>
                ) : courses?.length > 0 ? (
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
                ) : (
                    <p>Không có thẻ nào </p>
                )}
            </div>
        </div>
    );
}
