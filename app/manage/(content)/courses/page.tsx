import { ComboboxDemo } from "@/components/ComboboxDemo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const courseOptions = [
    { value: "all_courses", label: "Tất cả khóa học" },
    { value: "free_courses", label: "Khóa học miễn phí" },
    { value: "paid_courses", label: "Khóa học trả phí" },
    { value: "popular_courses", label: "Khóa học phổ biến" },
    { value: "new_courses", label: "Khóa học mới" },
]

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
]

export default function CoursesManagePage() {
    const skeletons = Array(6).fill(null);

    return (
        <div className="p-4">
            <div className="h-[60px] flex justify-between items-center px-4 bg-white rounded-md mb-3">
                <div className="flex items-center gap-2">
                    <div className="relative md:flex items-center hidden">
                        <Search className="absolute left-3 text-gray-600" size={18} strokeWidth={1.5} />
                        <Input
                            className="w-[400px] px-5 pl-10"
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                        />
                    </div>
                    <ComboboxDemo data={courseOptions} optionDefault="all_courses" />
                    <ComboboxDemo data={categoryOptions} optionDefault="all" />
                </div>
                <div className="flex items-center gap-2">
                    <Button>Thêm khóa học</Button>
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-4">
                {skeletons.map((_, index) => (
                    <Skeleton key={index} className="h-[290px] w-full aspect-video rounded-xl bg-white" />
                ))}
            </div>
        </div>
    );
}
