"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkAdminAccess = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) { router.push('/login'); return; }
                
                // Giả lập thời gian loading 1 giây
                setTimeout(() => {
                    setIsAuthorized(true);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error checking admin access:", error);
                window.location.replace("/login");
            }
        };

        checkAdminAccess();
    }, []);

    if (loading) {
        return <div className="w-full h-dvh bg-blue-500 flex justify-center items-center text-white">Loading...</div>;
    }

    return <>{children}</>;
};

export default AdminRoute;
