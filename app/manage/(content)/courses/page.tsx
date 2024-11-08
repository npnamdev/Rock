"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ComboboxDemo } from "@/components/ComboboxDemo";
import { CourseActionMenu } from "@/components/CourseActionMenu";
import { DrawerDemo } from "@/components/DrawerDemo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, DeleteIcon, EditIcon, EllipsisVertical, Plus, ScanEye, Search, SquarePen, Trash } from "lucide-react";

const courseOptions = [
    { value: "all_courses", label: "Tất cả khóa học" },
    { value: "free_courses", label: "Khóa học miễn phí" },
    { value: "paid_courses", label: "Khóa học trả phí" },
    { value: "popular_courses", label: "Khóa học phổ biến" },
    { value: "new_courses", label: "Khóa học mới" },
];

const categoryOptions = [
    { value: "all", label: "Tất cả danh mục" },
    { value: "tech", label: "Công nghệ" },
    { value: "business", label: "Kinh doanh" },
    { value: "design", label: "Thiết kế" },
    { value: "marketing", label: "Marketing" },
    { value: "language", label: "Ngôn ngữ" },
    { value: "art", label: "Nghệ thuật" },
    { value: "science", label: "Khoa học" },
    { value: "health", label: "Sức khỏe" },
    { value: "finance", label: "Tài chính" },
    { value: "education", label: "Giáo dục" },
    { value: "sports", label: "Thể thao" },
    { value: "music", label: "Âm nhạc" },
    { value: "law", label: "Luật" },
    { value: "literature", label: "Văn học" },
    { value: "food", label: "Ẩm thực" },
];

const courses = [
    {
        id: 1,
        title: "Thiết kế đồ họa cơ bản",
        description:
            "Khóa học giúp bạn nắm bắt các kỹ năng cơ bản về thiết kế đồ họa, sử dụng các công cụ như Photoshop, Illustrator.",
        price: "299.000đ",
        imageUrl: "https://res.cloudinary.com/dijvnrdmc/image/upload/v1721799507/1_aqdcfd.svg",
    },
    {
        id: 2,
        title: "Lập trình web với React",
        description:
            "Khóa học giúp bạn xây dựng các ứng dụng web hiện đại với React, từ cơ bản đến nâng cao.",
        price: "499.000đ",
        imageUrl: "https://res.cloudinary.com/dijvnrdmc/image/upload/v1721799509/7_u108dg.svg",
    },
    {
        id: 3,
        title: "Marketing online cho người mới bắt đầu",
        description:
            "Khóa học giúp bạn hiểu và áp dụng các chiến lược marketing online hiệu quả cho doanh nghiệp.",
        price: "350.000đ",
        imageUrl: "https://res.cloudinary.com/dijvnrdmc/image/upload/v1721799507/5_huihgl.svg",
    },
    {
        id: 4,
        title: "Phát triển ứng dụng di động với Flutter",
        description:
            "Khóa học giúp bạn xây dựng ứng dụng di động đa nền tảng với Flutter, từ những bước cơ bản đến nâng cao.",
        price: "600.000đ",
        imageUrl: "https://res.cloudinary.com/dijvnrdmc/image/upload/v1721799510/8_ub5s6s.svg",
    },
    {
        id: 5,
        title: "Kỹ năng giao tiếp và lãnh đạo",
        description:
            "Khóa học giúp bạn nâng cao kỹ năng giao tiếp, thuyết trình và lãnh đạo hiệu quả trong công việc.",
        price: "450.000đ",
        imageUrl: "https://res.cloudinary.com/dijvnrdmc/image/upload/v1721799514/3_kj19na.svg",
    },
    {
        id: 6,
        title: "Lập trình Python cho người mới bắt đầu",
        description:
            "Khóa học dạy bạn cách lập trình với Python, phù hợp với người mới bắt đầu và những ai muốn nâng cao kỹ năng lập trình.",
        price: "350.000đ",
        imageUrl: "https://res.cloudinary.com/dijvnrdmc/image/upload/v1721799506/4_qphs4p.svg",
    },
    {
        id: 7,
        title: "Thiết kế website với WordPress",
        description:
            "Khóa học giúp bạn tạo ra các website chuyên nghiệp bằng WordPress, từ thiết kế đến triển khai thực tế.",
        price: "400.000đ",
        imageUrl: "https://res.cloudinary.com/dijvnrdmc/image/upload/v1721799507/2_grgttc.svg",
    },
];


export default function CoursesManagePage() {
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
            action: (userGroupId: string) => console.log("Delete clicked", userGroupId)
        },
    ];


    return (
        <div className="p-4">
            <div className="h-[60px] flex justify-between items-center px-4 bg-white rounded-md mb-3">
                <div className="flex items-center gap-2">
                    <div className="relative md:flex items-center hidden">
                        <Search className="absolute left-3 text-gray-600" size={18} strokeWidth={1.5} />
                        <Input className="w-[340px] px-5 pl-10" type="text" placeholder="Tìm kiếm khóa học..." />
                    </div>
                    <DrawerDemo />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Edit Profile</Button>
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
                    {/* <ComboboxDemo data={categoryOptions} optionDefault="all" /> */}
                </div>
                <div className="flex items-center gap-2">
                    <Button className="border flex gap-1 px-3 font-semibold text-[13.5px]">
                        <Plus size={15} color="#fff" /> Thêm khóa học
                    </Button>
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white grid cursor-pointer grid-cols-[175px_auto_60px] items-center gap-2 rounded-md border shadow-lg"
                    >
                        <div className="m-2.5">
                            <img className="w-full rounded-lg shadow" src={course.imageUrl} alt={course.title} />
                        </div>

                        <div className="flex flex-col gap-1.5 text-sm">
                            <h5 className="m-0 font-bold">{course.title}</h5>
                            <p className="m-0 line-clamp-2 text-gray-500">{course.description}</p>
                            <p className="m-0">{course.price}</p>
                        </div>

                        <div className="flex items-center justify-center">
                            {/* <Button variant="outline" size="icon" className="w-7 h-7">
                                <EllipsisVertical size={20} strokeWidth={1.75} />
                            </Button> */}

                            <CourseActionMenu courseID="12345" options={menuOptions} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
