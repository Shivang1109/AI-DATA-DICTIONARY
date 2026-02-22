import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "primary" | "success" | "warning" | "error" | "info";
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Badge({ children, variant = "primary", size = "sm", className = "" }: BadgeProps) {
    const variantClasses = {
        primary: "badge-primary",
        success: "badge-success",
        warning: "badge-warning",
        error: "badge-error",
        info: "bg-blue-50 text-blue-600 border-blue-200",
    };

    const sizeClasses = {
        sm: "text-xs px-2.5 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
    };

    return (
        <span className={`badge ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
            {children}
        </span>
    );
}
