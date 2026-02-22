"use client";

import { useState } from "react";
import { Bell, Download, Trash2, Info, Save, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    emailAlerts: false,
    qualityThreshold: 80,
  });

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    toast.success("Settings saved successfully!");
  };

  const handleClearCache = () => {
    localStorage.removeItem("schema");
    toast.success("Cache cleared successfully!");
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "settings.json";
    link.click();
    toast.success("Settings exported!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-lg text-gray-600">Manage your preferences and application settings</p>
      </div>

      {/* Notifications */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <Bell size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            <p className="text-sm text-gray-600">Configure how you receive updates</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div>
              <div className="font-semibold text-gray-900">Push Notifications</div>
              <div className="text-sm text-gray-600">Receive in-app notifications</div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.notifications ? "bg-indigo-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div>
              <div className="font-semibold text-gray-900">Email Alerts</div>
              <div className="text-sm text-gray-600">Get notified via email</div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, emailAlerts: !settings.emailAlerts })}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.emailAlerts ? "bg-indigo-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.emailAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Quality */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Data Quality</h2>
            <p className="text-sm text-gray-600">Set quality thresholds and preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-900 mb-3">
              Quality Threshold: {settings.qualityThreshold}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.qualityThreshold}
              onChange={(e) => setSettings({ ...settings, qualityThreshold: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div>
              <div className="font-semibold text-gray-900">Auto-save Analysis</div>
              <div className="text-sm text-gray-600">Automatically save analysis results</div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.autoSave ? "bg-indigo-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.autoSave ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass-card p-8 space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
            <Download size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Data Management</h2>
            <p className="text-sm text-gray-600">Export and manage your data</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={handleExportSettings}
            className="p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
          >
            <Download className="text-indigo-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
            <div className="font-semibold text-gray-900 mb-1">Export Settings</div>
            <div className="text-sm text-gray-600">Download your preferences</div>
          </button>

          <button
            onClick={handleClearCache}
            className="p-4 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-left group"
          >
            <Trash2 className="text-red-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
            <div className="font-semibold text-gray-900 mb-1">Clear Cache</div>
            <div className="text-sm text-gray-600">Remove stored analysis data</div>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="glass-card p-8 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <Info size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">About</h2>
            <p className="text-sm text-gray-600">Application information</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
            <div className="text-2xl font-bold text-indigo-600 mb-1">v1.0.0</div>
            <div className="text-sm text-gray-600">Version</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
            <div className="text-2xl font-bold text-green-600 mb-1">PostgreSQL</div>
            <div className="text-sm text-gray-600">Database</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
            <div className="text-2xl font-bold text-amber-600 mb-1">AI Powered</div>
            <div className="text-sm text-gray-600">Technology</div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary px-8 py-3">
          <Save size={20} />
          Save Settings
        </button>
      </div>
    </div>
  );
}
