"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Database, Play, Bell, User } from "lucide-react";

export function Navbar() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <header className="fixed top-0 right-0 left-64 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40 px-8 flex items-center justify-between shadow-sm">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search tables, columns, or documentation..."
                        className="w-full py-2 pl-10 pr-4 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                <Link href="/connect" className="btn-secondary text-sm hidden md:flex">
                    <Database size={16} />
                    Connect DB
                </Link>

                <Link href="/connect" className="btn-primary text-sm">
                    <Play size={16} fill="currentColor" />
                    Run Scan
                </Link>

                <div className="h-8 w-px bg-gray-200 mx-2"></div>

                {/* Notifications */}
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-600 hover:text-indigo-500 transition-colors relative rounded-lg hover:bg-gray-50"
                    title="Notifications"
                >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-2 p-1 pl-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-all"
                    >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white">
                            AI
                        </div>
                        <User className="text-gray-600 mr-1" size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}
