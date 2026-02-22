"use client";

import Link from "next/link";
import {
    Database,
    Sparkles,
    BarChart3,
    Zap,
    ArrowRight,
    CheckCircle2,
    TrendingUp,
    Shield,
    Clock
} from "lucide-react";

export default function Home() {
    return (
        <div className="space-y-16 animate-in">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                    <Sparkles size={16} className="text-indigo-500" />
                    <span className="text-sm font-semibold text-indigo-600">Powered by AI & Machine Learning</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900">
                    Transform Your Database
                    <br />
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                        Into Living Documentation
                    </span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Automatically analyze, profile, and document your PostgreSQL databases with AI-powered insights. 
                    Save hours of manual work and keep your documentation always up-to-date.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                    <Link href="/connect" className="btn-primary text-lg px-10 py-4">
                        Start Analyzing
                        <ArrowRight size={20} />
                    </Link>
                    
                    <Link href="/explorer" className="btn-secondary text-lg px-10 py-4">
                        View Demo
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-500" />
                        <span>5M+ Records Analyzed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-indigo-500" />
                        <span>Under 30 Seconds</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={18} className="text-purple-500" />
                        <span>100% Secure</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="stat-card group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                            <TrendingUp size={24} />
                        </div>
                        <div className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
                            ↑ 12.5%
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">10x</div>
                    <div className="text-sm text-gray-600">Faster Documentation</div>
                </div>

                <div className="stat-card group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
                            <Zap size={24} />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">100%</div>
                    <div className="text-sm text-gray-600">Automated Analysis</div>
                </div>

                <div className="stat-card group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                            <Database size={24} />
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">∞</div>
                    <div className="text-sm text-gray-600">Tables Supported</div>
                </div>

                <div className="stat-card group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                            <BarChart3 size={24} />
                        </div>
                        <div className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
                            ↑ 2.3%
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">96%</div>
                    <div className="text-sm text-gray-600">Data Quality Score</div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-card p-8 text-center space-y-4 group">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 group-hover:scale-110 transition-transform">
                        <Database size={32} />
                    </div>
                    <div className="badge-primary inline-flex">Core Feature</div>
                    <h3 className="text-2xl font-bold text-gray-900">Auto Extract</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Automatically discover tables, columns, data types, and foreign key relationships from your database schema.
                    </p>
                </div>

                <div className="glass-card p-8 text-center space-y-4 group">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 text-green-600 group-hover:scale-110 transition-transform">
                        <BarChart3 size={32} />
                    </div>
                    <div className="badge-success inline-flex">Analytics</div>
                    <h3 className="text-2xl font-bold text-gray-900">Data Profile</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Analyze data quality with completeness metrics, uniqueness ratios, and statistical summaries for numeric columns.
                    </p>
                </div>

                <div className="glass-card p-8 text-center space-y-4 group">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 group-hover:scale-110 transition-transform">
                        <Sparkles size={32} />
                    </div>
                    <div className="badge-warning inline-flex">AI Powered</div>
                    <h3 className="text-2xl font-bold text-gray-900">AI Summaries</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Generate business-friendly explanations and usage recommendations powered by advanced AI models.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="glass-card p-12 text-center space-y-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                <h2 className="text-4xl font-bold text-gray-900">Ready to Transform Your Database?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Start analyzing in seconds. No credit card required.
                </p>
                <Link href="/connect" className="btn-primary text-lg px-12 py-4 inline-flex">
                    Get Started Free
                    <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
}
