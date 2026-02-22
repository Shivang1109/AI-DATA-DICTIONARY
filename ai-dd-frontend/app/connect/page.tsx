"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Database, Play, Loader2, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function ConnectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  
  const [config, setConfig] = useState({
    host: "localhost",
    port: "5432",
    user: "shivangpathak",
    password: "",
    database: "chinook",
    demo_mode: false
  });

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setProgress(0);

    const loadingToast = toast.loading("Analyzing database...");

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-production-8d47.up.railway.app";
      const res = await fetch(`${API_URL}/analyze-database`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: config.host,
          port: parseInt(config.port),
          user: config.user,
          password: config.password,
          database: config.database,
          demo_mode: config.demo_mode
        })
      });

      if (!res.ok) {
        const errorData = await res.text();
        console.error("Backend error:", errorData);
        throw new Error(`Backend error: ${res.status}`);
      }
      
      const result = await res.json();
      setProgress(100);
      localStorage.setItem("schema", JSON.stringify(result.schema));
      
      toast.success(`Successfully analyzed ${Object.keys(result.schema).length} tables!`, {
        id: loadingToast,
      });
      
      setTimeout(() => {
        router.push("/explorer");
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      console.error("Connection error:", err);
      const errorMsg = err instanceof Error ? err.message : "Failed to analyze database. Make sure backend is running and database credentials are correct.";
      setError(errorMsg);
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setLoading(false);
      clearInterval(progressInterval);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30">
          <Database size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Connect Your Database</h1>
        <p className="text-lg text-gray-600">
          Enter your PostgreSQL credentials or try our demo mode
        </p>
      </div>

      {/* Connection Form */}
      <div className="glass-card p-8 space-y-6">
        {/* Demo Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
          <div className="flex items-center gap-3">
            <Sparkles className="text-indigo-500" size={20} />
            <div>
              <div className="font-semibold text-gray-900">Demo Mode</div>
              <div className="text-sm text-gray-600">Try with sample data (6.2M records)</div>
            </div>
          </div>
          <button
            onClick={() => setConfig({ ...config, demo_mode: !config.demo_mode })}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
              config.demo_mode ? "bg-indigo-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                config.demo_mode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Connection Fields */}
        {!config.demo_mode && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Host</label>
                <input
                  type="text"
                  value={config.host}
                  onChange={(e) => setConfig({ ...config, host: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="localhost"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Port</label>
                <input
                  type="text"
                  value={config.port}
                  onChange={(e) => setConfig({ ...config, port: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="5432"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Database Name</label>
              <input
                type="text"
                value={config.database}
                onChange={(e) => setConfig({ ...config, database: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="chinook"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={config.user}
                onChange={(e) => setConfig({ ...config, user: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="postgres"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={config.password}
                onChange={(e) => setConfig({ ...config, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Progress Bar */}
        {loading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">Analyzing...</span>
              <span className="text-indigo-600 font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full btn-primary text-lg py-4 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Play size={20} fill="currentColor" />
              Start Analysis
            </>
          )}
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
          <CheckCircle2 className="text-green-500 mb-3" size={24} />
          <h3 className="font-semibold text-gray-900 mb-2">Secure Connection</h3>
          <p className="text-sm text-gray-600">
            Your credentials are never stored and connections are encrypted
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
          <Sparkles className="text-indigo-500 mb-3" size={24} />
          <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
          <p className="text-sm text-gray-600">
            Get intelligent insights and documentation in seconds
          </p>
        </div>
      </div>
    </div>
  );
}
