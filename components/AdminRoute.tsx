"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkAdminAccess = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) { router.push('/login'); return; }

                // const response = await fetch("https://api.example.com/getMe", {
                //     method: "GET",
                //     headers: { Authorization: `Bearer ${token}`, },
                // });

                // if (!response.ok) {
                //     window.location.replace("/login");
                //     return;
                // }

                // const user = await response.json();

                // if (user.role !== "admin") {
                //     window.location.replace("/forbidden");
                //     return;
                // }

                setIsAuthorized(true);
            } catch (error) {
                console.error("Error checking admin access:", error);
                window.location.replace("/login");
            }
        };

        checkAdminAccess();
    }, []);

    if (isAuthorized === false) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AdminRoute;
