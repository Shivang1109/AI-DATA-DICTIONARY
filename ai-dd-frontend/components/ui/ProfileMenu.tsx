"use client";

import Link from "next/link";
import { User, Settings, LogOut, HelpCircle } from "lucide-react";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { icon: User, label: "Profile", href: "#", disabled: true },
    { icon: Settings, label: "Settings", href: "/settings", disabled: false },
    { icon: HelpCircle, label: "Help & Support", href: "#", disabled: true },
    { icon: LogOut, label: "Sign Out", href: "#", disabled: true },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div 
        className="absolute right-0 top-12 w-64 rounded-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(30, 41, 59, 0.98)',
          backdropFilter: 'blur(12px)'
        }}
      >
        {/* User Info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'rgb(59, 130, 246)' }}
            >
              AI
            </div>
            <div>
              <p className="font-semibold text-white">AI User</p>
              <p className="text-xs text-gray-400">ai@datadictionary.com</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const content = (
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white/5 cursor-pointer'
                }`}
              >
                <Icon size={18} className="text-gray-400" />
                <span className="text-sm text-white">{item.label}</span>
                {item.disabled && (
                  <span className="ml-auto text-xs text-gray-500">Soon</span>
                )}
              </div>
            );

            if (item.disabled) {
              return <div key={index}>{content}</div>;
            }

            return (
              <Link key={index} href={item.href} onClick={onClose}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
