import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: "indigo" | "green" | "purple" | "amber" | "blue";
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, color = "indigo" }: StatCardProps) {
    const colorClasses = {
        indigo: "from-indigo-500 to-indigo-600",
        green: "from-green-500 to-green-600",
        purple: "from-purple-500 to-purple-600",
        amber: "from-amber-500 to-amber-600",
        blue: "from-blue-500 to-blue-600",
    };

    return (
        <div className="stat-card">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}>
                        {trendUp ? "↑" : "↓"} {trend}
                    </div>
                )}
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-sm text-gray-600">{title}</div>
        </div>
    );
}
