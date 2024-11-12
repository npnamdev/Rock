"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronsUpDown, Download, Plus, ScanEye, Search, SquarePen, Trash, Upload } from "lucide-react";
import axios from 'axios';
import moment from 'moment';
import { mutate } from "swr";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { UserActionMenu } from "@/components/UserActionMenu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ContentTagPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<Coupon[]>([]);
    const [limit, setLimit] = useState(10);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("10");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

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
        `https://api.rock.io.vn/api/v1/activation-codes?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`,
        fetcher, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    const handleCreateUserGroup = async () => {
        try {
            const response = await axios.post("https://api.rock.io.vn/api/v1/activation-codes", { name: groupName, description: groupDescription });
            if (response) {
                mutate(`https://api.rock.io.vn/api/v1/activation-codes?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`);
                console.log('User group created successfully:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDeleteUserGroup = async (userGroupId: string) => {
        try {
            const response = await axios.delete(`https://api.rock.io.vn/api/v1/activation-codes/${userGroupId}`);
            if (response) {
                mutate(`https://api.rock.io.vn/api/v1/activation-codes?page=${currentPage}&limit=${limit}&search=${debouncedSearchTerm}`);
                console.log('User group deleted successfully:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const roles: Coupon[] = data?.data;
    const totalPages = data?.pagination?.totalPages;
    const totalUsers = data?.pagination?.totalUsers;
    const handleNext = () => { if (currentPage < data?.pagination?.totalPages) setCurrentPage(currentPage + 1); };
    const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleFirstPage = () => setCurrentPage(1);
    const handleLastPage = () => setCurrentPage(data?.pagination?.totalPages);

    const handleLimitChange = (newLimit: any) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

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

    useEffect(() => {
        console.log("Selected roles: ", selectedUsers);
    }, [selectedUsers]);

    const menuOptions = [
        { icon: <ScanEye size={16} strokeWidth={1.5} />, value: "details", label: "Details", action: (userGroupId: string) => console.log("Details clicked", userGroupId) },
        { icon: <SquarePen size={16} strokeWidth={1.5} />, value: "edit", label: "Update", action: (userGroupId: string) => console.log("Update clicked", userGroupId) },
        { icon: <Trash size={16} strokeWidth={1.5} />, value: "delete", label: "Delete", action: (userGroupId: string) => handleDeleteUserGroup(userGroupId) },
    ];


    return (
        <div className="px-4 py-2 md:py-4 w-full">
            <div className="text-black shadow rounded-md overflow-auto border select-none w-full bg-white">
                <div className="h-[55px] md:h-[60px] px-5 md:flex justify-between items-center w-full">
                    <div className="relative md:flex items-center hidden">
                        <Search className="absolute left-3 text-gray-600" size={18} strokeWidth={1.5} />
                        <Input
                            className="w-[360px] px-5 pl-10"
                            type="text"
                            placeholder="Tìm kiếm danh mục..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 h-full justify-between">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="border flex gap-1 px-3 font-semibold text-[13.5px]">
                                    <Plus size={15} color="#fff" /> Thêm danh mục
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <div className="mt-5">
                                    <Input type="text" placeholder="Name" value={groupName} onChange={(event) => setGroupName(event.target.value)} />
                                    <Input type="text" placeholder="Description" value={groupDescription} onChange={(event) => setGroupDescription(event.target.value)} />
                                </div>
                                <DialogFooter className="sm:justify-end">
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">Close</Button>
                                    </DialogClose>
                                    <Button type="button" onClick={() => handleCreateUserGroup()}>Create Group</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-100 hover:bg-gray-20">
                            <TableHead className="text-black px-4 h-[50px] font-bold pl-5">
                                <Checkbox onCheckedChange={handleSelectAllUsers} checked={roles?.every(user => selectedUsers.includes(user))} />
                            </TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Mã kích hoạt</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Bắt đầu</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Kết thúc</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Trạng thái</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap">Tình trạng</TableHead>
                            <TableHead className="text-black px-4 h-[50px] font-bold text-[13px] whitespace-nowrap"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-[50px] text-center font-medium">
                                    Đang tải...
                                </TableCell>
                            </TableRow>
                        ) : roles?.length > 0 ? (
                            roles.map((role: Coupon, index: number) => (
                                <TableRow key={role._id}>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap pl-5">
                                        <Checkbox checked={selectedUsers.includes(role)} onCheckedChange={() => handleSelectUser(role)} />
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-[13px] capitalize">{role.code}</h3>
                                        </div>
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">{moment(role.startTime).subtract(10, 'days').calendar()}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">{moment(role.endTime).subtract(10, 'days').calendar()}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <div className={`rounded-lg px-2 py-1 text-xs w-min text-primary-foreground ${role.status ? 'bg-[#3eca65]' : 'bg-[#f45d5d]'}`}>
                                            {role.status ? "Hoạt động" : "Không hoạt động"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">{role.isUsed ? "Đã sử dụng" : "Chưa sử dụng"}</TableCell>
                                    <TableCell className="h-[50px] px-4 cursor-pointer whitespace-nowrap">
                                        <UserActionMenu options={menuOptions} userID={role?._id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-[50px] text-center font-medium">
                                    Không có danh mục nào
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="h-[55px] px-5 flex justify-between items-center border-t w-full">
                    <div className="hidden md:flex flex-1 text-sm font-semibold">Đã chọn {selectedUsers.length} / {totalUsers} hàng</div>
                    <div className="flex gap-2 items-center justify-center text-sm font-medium mr-4">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[70px] items-center justify-between font-medium px-2.5 h-8">
                                    {value}
                                    <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[70px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {itemsPerPageOptions.map((option) => (
                                                <CommandItem
                                                    key={option.value}
                                                    value={option.value}
                                                    onSelect={() => {
                                                        if (option.value === value) {
                                                            setOpen(false);
                                                        } else {
                                                            setValue(option.value);
                                                            setOpen(false);
                                                            option.action && option.action();
                                                        }
                                                    }}
                                                >
                                                    {option.label}
                                                </CommandItem>
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

