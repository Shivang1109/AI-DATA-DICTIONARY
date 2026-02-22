"use client";

import { X, CheckCircle2, Info, AlertCircle } from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "info" | "warning";
  title: string;
  message: string;
  time: string;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const notifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "Analysis Complete",
      message: "Successfully analyzed 10 tables with 6.2M records",
      time: "2 minutes ago"
    },
    {
      id: "2",
      type: "info",
      title: "Welcome",
      message: "Welcome to AI Data Dictionary! Try demo mode to get started.",
      time: "1 hour ago"
    }
  ];

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 size={20} style={{ color: 'rgb(34, 197, 94)' }} />;
      case "warning":
        return <AlertCircle size={20} style={{ color: 'rgb(234, 179, 8)' }} />;
      default:
        return <Info size={20} style={{ color: 'rgb(59, 130, 246)' }} />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className="fixed right-0 top-0 h-full w-96 z-50 shadow-2xl"
        style={{ 
          backgroundColor: 'rgba(15, 23, 42, 0.98)',
          backdropFilter: 'blur(12px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
              >
                <div className="flex items-start gap-3">
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
