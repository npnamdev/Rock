"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import axios from "axios";

// Định nghĩa kiểu cho Permission
interface Permission {
    name: string;
    key: string;
    status: boolean;
}

// Định nghĩa kiểu cho PermissionCategory
interface PermissionCategory {
    title: string;
    key: string;
    permissions: Permission[];
}

// Định nghĩa kiểu cho RolesResponse
interface RolesResponse {
    data: {
        name: string;
        permissions: Record<string, boolean>;
    };
}

// Định nghĩa kiểu cho props của component
interface PermissionsModalProps {
    roleId: string;
}

export default function PermissionsModal({ roleId }: PermissionsModalProps) {
    const [roleName, setRoleName] = useState<string>("");
    const [permissions, setPermissions] = useState<PermissionCategory[]>([
        {
            title: "Danh sách quyền người dùng",
            key: "userPermissions",
            permissions: [
                { name: "Lấy danh sách người dùng", key: "getUsers", status: false },
                { name: "Lấy người dùng theo ID", key: "getUserById", status: false },
                { name: "Tạo người dùng", key: "createUser", status: false },
                { name: "Cập nhật người dùng", key: "updateUser", status: false },
                { name: "Xoá người dùng", key: "deleteUser", status: false },
            ],
        },
        {
            title: "Danh sách quyền vai trò",
            key: "rolePermissions",
            permissions: [
                { name: "Lấy danh sách vai trò", key: "getRoles", status: false },
                { name: "Lấy vai trò theo ID", key: "getRoleById", status: false },
                { name: "Tạo vai trò", key: "createRole", status: false },
                { name: "Cập nhật vai trò", key: "updateRole", status: false },
                { name: "Xoá vai trò", key: "deleteRole", status: false },
            ],
        },
        {
            title: "Danh sách quyền khóa học",
            key: "coursePermissions",
            permissions: [
                { name: "Xem Danh Sách Khóa Học", key: "getCourses", status: false },
                { name: "Xem Khóa Học Theo ID", key: "getCourseById", status: false },
                { name: "Thêm Khóa Học Mới", key: "addCourse", status: false },
                { name: "Cập Nhật Khóa Học", key: "updateCourse", status: false },
                { name: "Xóa Khóa Học", key: "deleteCourse", status: false },
                { name: "Tìm kiếm Khóa Học", key: "searchCourses", status: false },
                { name: "Ghi Danh Khóa Học", key: "enrollCourse", status: false },
                { name: "Hủy Ghi Danh Khóa Học", key: "unenrollCourse", status: false },
                { name: "Truy Cập Tài Liệu Khóa Học", key: "accessCourseMaterials", status: false },
                { name: "Quản Lý Giảng Viên", key: "manageInstructors", status: false },
            ],
        },
        {
            title: "Danh sách quyền thư viện",
            key: "libraryPermissions",
            permissions: [
                { name: "Get Book List", key: "getBooks", status: false },
                { name: "Get Book by ID", key: "getBookById", status: false },
                { name: "Add New Book", key: "addBook", status: false },
                { name: "Update Book", key: "updateBook", status: false },
                { name: "Delete Book", key: "deleteBook", status: false },
            ],
        },
    ]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get<RolesResponse>(`https://api.rock.io.vn/api/v1/roles/${roleId}`);
                const roles = response.data.data;
                console.log("Roles response:", roles);
                setRoleName(roles?.name);

                const updatedPermissions = permissions.map((category) => {
                    return {
                        ...category,
                        permissions: category.permissions.map((permission) => ({
                            ...permission,
                            status: roles.permissions[permission.key] || false,
                        })),
                    };
                });

                setPermissions(updatedPermissions);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        fetchRoles();
    }, [roleId, permissions]);

    const handleToggle = (categoryKey: string, index: number) => {
        const updatedPermissions = permissions.map((category) => {
            if (category.key === categoryKey) {
                const updatedCategory = { ...category };
                updatedCategory.permissions[index].status =
                    !updatedCategory.permissions[index].status;
                return updatedCategory;
            }
            return category;
        });

        setPermissions(updatedPermissions);
    };

    const handleUpdate = () => {
        const combinedPermissions = permissions.reduce((acc, category) => {
            category.permissions.forEach((permission) => {
                acc[permission.key] = permission.status;
            });
            return acc;
        }, {} as Record<string, boolean>);
        console.log(combinedPermissions);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Detail <span className="capitalize"> {roleName} </span> Permissions
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl flex flex-col items-start p-0 gap-0">
                <DialogHeader className="border-b w-full h-[60px] justify-center px-6">
                    <DialogTitle className="text-md">
                        Vai trò <span className="capitalize">{roleName}</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="h-[calc(100dvh-120px)] lg:h-[400px] w-full px-4 overflow-auto select-none py-4">
                    <Accordion defaultValue="userPermissions" type="single" collapsible className="flex flex-col w-full gap-3">
                        {permissions.map((category) => (
                            <AccordionItem key={category.key} value={category.key} className="shadow-md py-0 rounded-lg border">
                                <AccordionTrigger className="hover:no-underline px-4 py-3">{category.title}</AccordionTrigger>
                                <AccordionContent className="p-0 border-t">
                                    <div className="grid grid-cols-1 md:grid-cols-2 px-4 gap-5 py-5">
                                        {category.permissions.map((permission, index) => (
                                            <div key={permission.key} className="flex items-center space-x-2">
                                                <Switch
                                                    disabled={false}
                                                    id={permission.key}
                                                    checked={permission.status}
                                                    onCheckedChange={() =>
                                                        handleToggle(category.key, index)
                                                    }
                                                />
                                                <Label htmlFor={permission.key}>
                                                    {permission.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <DialogFooter className="flex sm:justify-center border-t w-full h-[60px] items-center px-4">
                    <div className="flex items-center h-full justify-end w-full gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Hủy bỏ</Button>
                        </DialogClose>

                        <Button onClick={handleUpdate}>
                            Cập nhật quyền
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
