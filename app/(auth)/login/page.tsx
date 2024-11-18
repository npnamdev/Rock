"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { loginUser } from "@/services/api";
import { toast } from 'sonner';

export default function LoginPage() {
    const [email, setEmail] = useState('root@doman.com');
    const [password, setPassword] = useState('root123456');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res: any = await loginUser(email, password);
            if (res) {
                router.push('/manage');
                localStorage.setItem('accessToken', res.accessToken);
                toast.success("Đăng nhập thành công");
            } else {
                toast.error("Đăng nhập thất bại");
            }
        } catch (error) {
            toast.error("Lỗi hệ thống!");
        }
    };

    return (
        <div className="flex bg-gray-100 h-dvh lg:h-screen w-full items-center justify-center px-4 bg-[url('https://hachium.com/wp-content/uploads/2024/02/grid-1024x671.png')] bg-cover">
            <Card className="w-full mx-auto lg:max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/manage" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button className="w-full" onClick={() => handleLogin()}>
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
