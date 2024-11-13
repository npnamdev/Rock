"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown, Copy, Download, Plus, ScanEye, Search, SquarePen, Trash, Upload } from "lucide-react";
import axios from 'axios';
import moment from 'moment';
import { mutate } from "swr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { UserActionMenu } from "@/components/UserActionMenu";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import slugify from 'slugify';
import { Textarea } from "@/components/ui/textarea";
import copy from 'clipboard-copy';

export default function ContentTagPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [openModalTag, setOpenModalTag] = useState(false);

    const handleNameChange = (event: any) => {
        const inputName = event.target.value;
        setName(inputName);
        const generatedSlug = slugify(inputName, { lower: true, strict: true, locale: 'vi' });
        setSlug(generatedSlug);
    };

    const handleSlugBlur = (event: any) => {
        const inputSlug = event.target.value;
        const generatedSlug = slugify(inputSlug, { lower: true, strict: true, locale: 'vi' });
        setSlug(generatedSlug);
    };


    const handleCreateTag = async () => {
        if (!name.trim()) { toast.error("Vui lòng nhập tên thẻ."); return; }
        if (!slug.trim()) { toast.error("Vui lòng nhập đường dẫn cho thẻ."); return; }
        try {
            const res = await axios.post("https://api.rock.io.vn/api/v1/course-tags", { name, description, slug });
            if (res) {
                mutate(`https://api.rock.io.vn/api/v1/course-tags?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`);
                setOpenModalTag(false);
                toast.success("Tạo mới thẻ thành công");
                setName('');
                setDescription('');
                setSlug('');
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi tạo thẻ.");
        }
    };

    const handleDeleteTag = async (tagId: string) => {
        try {
            const res = await axios.delete(`https://api.rock.io.vn/api/v1/course-tags/${tagId}`);
            if (res) {
                mutate(`https://api.rock.io.vn/api/v1/course-tags?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`);
                toast.success("Xóa thẻ thành công", { description: res.data.createdAt });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<Tag[]>([]);
    const [limit, setLimit] = useState(10);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("10");
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
        `https://api.rock.io.vn/api/v1/course-tags?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`,
        fetcher, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
    );


    const roles: Tag[] = data?.data;
    const totalPages = data?.pagination?.totalPages;
    const totalUsers = data?.pagination?.totalTags;
    const handleNext = () => { if (currentPage < data?.pagination?.totalPages) setCurrentPage(currentPage + 1); };
    const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(data?.pagination?.totalPages);

    const handleLimitChange = (newLimit: any) => { setLimit(newLimit); setCurrentPage(1); };
    const handleSelectUser = (user: any) => {
        setSelectedUsers((prevSelected: any) =>
            prevSelected.includes(user) ? prevSelected.filter((u: any) => u !== user) : [...prevSelected, user]
        );
    };

    const handleSelectAllUsers = () => {
        const allSelected = roles.every((user: any) => selectedUsers.includes(user));
        const updatedSelectedUsers = allSelected
            ? selectedUsers.filter((u) => !roles.includes(u))
            : Array.from(new Set([...selectedUsers, ...roles]));
        setSelectedUsers(updatedSelectedUsers);
    };


    const itemsPerPageOptions = [
        { value: "5", label: "5", action: () => handleLimitChange(5) },
        { value: "10", label: "10", action: () => handleLimitChange(10) },
        { value: "15", label: "15", action: () => handleLimitChange(15) },
        { value: "30", label: "30", action: () => handleLimitChange(30) },
    ];

    useEffect(() => { console.log("Selected roles: ", selectedUsers); }, [selectedUsers]);

    const copyToClipboardById = (tagId: string) => {
        copy(`#${tagId}`).then(() => {
            console.log('Đã sao chép ID:', tagId);
            toast.success(`Đã sao chép Id thẻ: ${tagId}`);
        }).catch((error) => {
            toast.error("Đã xảy ra lỗi khi sao chép.");
        });
    }

    const menuOptions = [
        { icon: <Copy size={16} strokeWidth={1.5} />, value: "copyId", label: "Copy ID thẻ", action: (tagId: string) => copyToClipboardById(tagId) },
        { icon: <ScanEye size={16} strokeWidth={1.5} />, value: "details", label: "Chi tiết thẻ", action: (tagId: string) => toast.error(`Tính năng đang được phát triển :))`) },
        { icon: <SquarePen size={16} strokeWidth={1.5} />, value: "edit", label: "Chỉnh sửa thẻ", action: (tagId: string) => toast.error(`Tính năng đang được phát triển :))`) },
        { icon: <Trash size={16} strokeWidth={1.5} />, value: "delete", label: "Xóa thẻ", action: (tagId: string) => handleDeleteTag(tagId) },
    ];

    return (
        <div className="px-4 py-2 md:py-4 w-full">
            <div className="text-black shadow rounded-md overflow-auto border select-none w-full bg-white">
                <div className="h-[55px] md:h-[60px] px-5 md:flex justify-between items-center w-full">
                    <div className="relative md:flex items-center hidden">
                        <Search className="absolute left-3 text-gray-600" size={18} strokeWidth={1.5} />
                        <Input className="w-[360px] px-5 pl-10" type="text" placeholder="Tìm kiếm thẻ khóa học..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-2 h-full justify-between">
                        <Dialog open={openModalTag} onOpenChange={setOpenModalTag}>
                            <DialogTrigger asChild>
                                <Button className="border flex gap-1 px-3 font-semibold text-[13.5px]">
                                    <Plus size={15} color="#fff" /> Tạo thẻ khóa học mới
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-full lg:w-[600px] p-0 lg:rounded-xl">
                                <DialogHeader className="border-b px-6 h-[60px] justify-center">
                                    <h5 className="text-[16px] font-bold">Tạo thẻ khóa học mới</h5>
                                </DialogHeader>
                                <div className="flex flex-col gap-5 w-full px-6 py-1">
                                    <div className="grid items-center gap-1.5 w-full">
                                        <Label className="font-semibold" htmlFor="name">*Tên thẻ khóa học</Label>
                                        <Input className="w-full text-sm" type="text" placeholder="Nhập tên thẻ, ví dụ: SQL" value={name} onChange={handleNameChange} />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label className="font-semibold" htmlFor="description">Mô tả thẻ khóa học</Label>
                                        <Textarea className="w-full h-[100px] resize-none text-sm" placeholder="Mô tả ngắn gọn về thẻ, ví dụ: Học SQL để quản lý cơ sở dữ liệu" value={description} onChange={(event) => setDescription(event.target.value)} />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label className="font-semibold" htmlFor="slug">*Đường dẫn thẻ khóa học</Label>
                                        <Input className="w-full text-sm" type="text" placeholder="Nhập đường dẫn duy nhất, ví dụ: sql" value={slug} onChange={(event) => setSlug(event.target.value)} onBlur={handleSlugBlur} />
                                    </div>
                                </div>
                                <DialogFooter className="sm:justify-end border-t px-6 h-[60px] items-center">
                                  <div class="w-full flex justify-end items-center">                                    
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Trở lại</Button>
                                    </DialogClose>
                                    <Button type="button" onClick={() => handleCreateTag()}>Tạo thẻ mới</Button>
                                   </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-100 hover:bg-gray-20">
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap pl-6">#</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Tên thẻ</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Mô tả</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Đường dẫn</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Ngày tạo</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Ngày cập nhật</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow> <TableCell colSpan={7} className="h-[50px] text-center font-medium"> Đang tải... </TableCell> </TableRow>
                        ) : roles?.length > 0 ? (
                            roles.map((role: Tag, index: number) => (
                                <TableRow key={role._id}>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap pl-6 font-semibold">{index += 1}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <h3 className="font-bold text-[13px] capitalize">{role.name}</h3>
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">{role.description}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <div className={`rounded-lg px-2 py-1 text-xs w-min bg-[#FDEAB9] text-[#9B6327] font-bold`}> {role.slug}</div>
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">{moment(role.createdAt).subtract(10, 'days').calendar()}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">{moment(role.updatedAt).subtract(10, 'days').calendar()}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <UserActionMenu options={menuOptions} userID={role?._id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow> <TableCell colSpan={7} className="h-[50px] text-center font-medium"> Không có thẻ nào </TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="h-[55px] px-5 flex justify-between items-center border-t w-full">
                    <div className="hidden md:flex flex-1 text-sm font-semibold">Tổng số thẻ: {totalUsers}</div>
                    <div className="flex gap-2 items-center justify-center text-sm font-medium mr-4">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[70px] items-center justify-between font-medium px-2.5 h-8">
                                    {value} <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[70px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {itemsPerPageOptions.map((option) => (
                                                <CommandItem key={option.value} value={option.value} onSelect={() => { if (option.value === value) { setOpen(false); } else { setValue(option.value); setOpen(false); option.action && option.action(); } }}>{option.label}</CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="hidden md:flex w-[100px] items-center justify-center text-sm font-medium mr-4">Trang {currentPage} / {totalPages}</div>
                    <Pagination className="w-min mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleFirstPage} disabled={currentPage === 1}>
                                    <ChevronsLeft size={16} className="text-gray-700" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button variant="outline" size="icon" className="w-8 h-8" onClick={handlePrevious} disabled={currentPage === 1}>
                                    <ChevronLeft size={16} className="text-gray-700" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleNext} disabled={currentPage === totalPages}>
                                    <ChevronRight size={16} className="text-gray-700" />
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button variant="outline" size="icon" className="w-8 h-8" onClick={handleLastPage} disabled={currentPage === totalPages}>
                                    <ChevronsRight size={16} className="text-gray-700" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

