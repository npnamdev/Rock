"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import moment from "moment";

type UserRole = {
    name: string;
};

type User = {
    username: string;
    email: string;
    isActive: boolean;
    role: UserRole;
    createdAt: string;
};

const fakeUsers: User[] = [
    {
        username: "john_doe",
        email: "john.doe@example.com",
        isActive: true,
        role: { name: "Admin" },
        createdAt: "2023-01-15T12:34:56Z"
    },
    {
        username: "jane_smith",
        email: "jane.smith@example.com",
        isActive: false,
        role: { name: "User" },
        createdAt: "2022-11-22T08:45:32Z"
    },
    {
        username: "peter_parker",
        email: "peter.parker@example.com",
        isActive: true,
        role: { name: "Moderator" },
        createdAt: "2023-07-01T10:12:24Z"
    },
    {
        username: "bruce_wayne",
        email: "bruce.wayne@example.com",
        isActive: false,
        role: { name: "User" },
        createdAt: "2021-09-18T15:30:48Z"
    },
    {
        username: "clark_kent",
        email: "clark.kent@example.com",
        isActive: true,
        role: { name: "Super Admin" },
        createdAt: "2023-05-27T17:23:11Z"
    },
    {
        username: "diana_prince",
        email: "diana.prince@example.com",
        isActive: true,
        role: { name: "Admin" },
        createdAt: "2022-10-05T09:15:45Z"
    },
    {
        username: "tony_stark",
        email: "tony.stark@example.com",
        isActive: false,
        role: { name: "User" },
        createdAt: "2023-03-20T18:34:50Z"
    },
    {
        username: "steve_rogers",
        email: "steve.rogers@example.com",
        isActive: true,
        role: { name: "Moderator" },
        createdAt: "2022-12-11T11:56:30Z"
    },
    {
        username: "natasha_romanoff",
        email: "natasha.romanoff@example.com",
        isActive: true,
        role: { name: "User" },
        createdAt: "2023-08-14T13:22:00Z"
    },
    {
        username: "thor_odinson",
        email: "thor.odinson@example.com",
        isActive: false,
        role: { name: "User" },
        createdAt: "2021-11-07T08:12:21Z"
    },
];


export default function AccountGroupsPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true);
            setTimeout(() => {
                setUsers(fakeUsers);
                setIsLoading(false);
            }, 500);
        };
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <div className="text-black shadow rounded-lg overflow-auto border select-none">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-100 hover:bg-gray-20">
                            <TableHead className="text-black px-4 h-[52px] font-bold pl-5">
                                <Checkbox />
                            </TableHead>
                            <TableHead className="text-black px-4 h-[52px] font-bold text-sm">Full Name</TableHead>
                            <TableHead className="text-black px-4 h-[52px] font-bold text-sm">Email</TableHead>
                            <TableHead className="text-black px-4 h-[52px] font-bold text-sm">
                                Status
                            </TableHead>
                            <TableHead className="text-black px-4 h-[52px] font-bold text-sm">
                                Role
                            </TableHead>
                            <TableHead className="text-black px-4 h-[52px] font-bold text-sm">
                                Date
                            </TableHead>
                            <TableHead className="text-black px-4 h-[52px] font-bold text-sm"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-[52px] text-center font-medium">
                                    Đang tải...
                                </TableCell>
                            </TableRow>
                        ) : users?.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.username}>
                                    <TableCell className="h-[52px] px-4 cursor-pointer pl-5">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell className="h-[52px] px-4 cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <Image className="w-7 h-7 rounded-full" src="https://lineone.piniastudio.com/images/avatar/avatar-1.jpg" width={50} height={50} alt="dev" />
                                            <h3 className="font-bold text-[13px]">{user.username}</h3>
                                        </div>
                                    </TableCell>
                                    <TableCell className="h-[52px] px-4 cursor-pointer">{user.email}</TableCell>
                                    <TableCell className="h-[52px] px-4 cursor-pointer">
                                        <div className={`rounded-lg px-2 py-1 text-xs w-min text-primary-foreground ${user.isActive ? 'bg-[#3eca65]' : 'bg-[#f45d5d]'}`}>
                                            {user.isActive ? "Active" : "Inactive"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="h-[52px] px-4 cursor-pointer">{user?.role?.name}</TableCell>
                                    <TableCell className="h-[52px] px-4 cursor-pointer">{moment(user.createdAt).format('MMM D, YYYY')}</TableCell>
                                    <TableCell className="h-[52px] px-4 cursor-pointer">
                                        ...
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-[52px] text-center font-medium">
                                    Không có người dùng nào
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
