"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";

interface ModalCreateUserProps {
    handleCreateUser: (userData: { username: string; email: string; password: string }) => void;
}

export function ModalCreateUser({ handleCreateUser }: ModalCreateUserProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    useEffect(() => {
        if (username && password && validateEmail(email)) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [username, email, password]);

    const createUser = () => {
        const userData = { username, email, password };
        handleCreateUser(userData);
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && isFormValid) {
            createUser();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="border flex gap-1 px-3 font-semibold text-[13.5px]">
                    <Plus size={15} color="#fff" /> New User
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg h-[400px]">
                <div className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button onClick={() => setIsOpen(false)}>
                            Đóng
                        </Button>
                        <Button onClick={createUser} disabled={!isFormValid}>
                            Tạo Mới
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
