"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'rgba(30, 41, 59, 0.95)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '0.75rem',
          padding: '16px',
        },
        success: {
          iconTheme: {
            primary: 'rgb(34, 197, 94)',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: 'rgb(239, 68, 68)',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
