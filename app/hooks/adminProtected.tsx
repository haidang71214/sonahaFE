"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
    children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
    const { user } = useSelector((state: any) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            router.push("/"); // Chặn user không phải admin
        }
    }, [user, router]);

    if (!user || user.role !== "admin") return null; // Tránh render lỗi

    return <>{children}</>;
}
