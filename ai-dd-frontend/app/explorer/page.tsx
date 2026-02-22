"use client";

import { useState, useEffect } from "react";
import { Search, Database, Download, TrendingUp, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { QualityChart } from "@/components/charts/QualityChart";
import { RelationshipGraph } from "@/components/charts/RelationshipGraph";
import { exportToJSON, exportToCSV, exportToPDF } from "@/lib/export";
import toast from "react-hot-toast";

export default function ExplorerPage() {
  const [schema, setSchema] = useState<any>(null);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "analytics" | "lineage">("details");

  useEffect(() => {
    const storedSchema = localStorage.getItem("schema");
    if (storedSchema) {
      const parsedSchema = JSON.parse(storedSchema);
      setSchema(parsedSchema);
      if (Object.keys(parsedSchema).length > 0) {
        setSelectedTable(Object.keys(parsedSchema)[0]);
      }
    }
  }, []);

  if (!schema) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Database className="mx-auto text-gray-300" size={64} />
          <h2 className="text-2xl font-bold text-gray-900">No Schema Data</h2>
          <p className="text-gray-600">Please connect to a database first</p>
          <a href="/connect" className="btn-primary inline-flex">
            Connect Database
          </a>
        </div>
      </div>
    );
  }

  const tables = Object.keys(schema);
  const filteredTables = tables.filter((table) =>
    table.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTable = schema[selectedTable];
  
  // Calculate quality score from profile data
  const calculateQualityScore = (table: any) => {
    if (!table?.profile?.completeness) return 0;
    const completenessValues = Object.values(table.profile.completeness) as number[];
    const avgCompleteness = completenessValues.reduce((a, b) => a + b, 0) / completenessValues.length;
    return Math.round(avgCompleteness * 100);
  };

  const qualityScore = calculateQualityScore(currentTable);

  const getQualityColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getQualityLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Attention";
  };

  // Prepare columns with completeness and uniqueness
  const getColumnsWithMetrics = (table: any) => {
    if (!table?.columns) return [];
    return table.columns.map((col: any) => ({
      ...col,
      completeness: table.profile?.completeness?.[col.name] ? Math.round(table.profile.completeness[col.name] * 100) : 0,
      uniqueness: table.profile?.uniqueness_ratio?.[col.name] ? Math.round(table.profile.uniqueness_ratio[col.name] * 100) : 0,
    }));
  };

  const columnsWithMetrics = getColumnsWithMetrics(currentTable);

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar - Table List */}
      <div className="w-80 glass-card p-6 space-y-4 overflow-hidden flex flex-col">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Tables</h2>
          <p className="text-sm text-gray-600 mb-4">{tables.length} tables found</p>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Table List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {filteredTables.map((table) => {
            const tableData = schema[table];
            const score = calculateQualityScore(tableData);
            const isActive = selectedTable === table;

            return (
              <button
                key={table}
                onClick={() => setSelectedTable(table)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Database size={16} className={isActive ? "text-white" : "text-indigo-500"} />
                    <span className="font-semibold text-sm">{table}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-600"
                  }`}>
                    {tableData?.columns?.length || 0} cols
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isActive ? "bg-white" : score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : "bg-red-500"
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${isActive ? "text-white" : "text-gray-600"}`}>
                    {score}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Export Actions */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => {
              exportToJSON(schema, selectedTable);
              toast.success("Exported to JSON");
            }}
            className="w-full btn-secondary text-sm py-2.5 justify-center"
          >
            <Download size={16} />
            Export JSON
          </button>
          <button
            onClick={() => {
              exportToCSV(schema, selectedTable);
              toast.success("Exported to CSV");
            }}
            className="w-full btn-secondary text-sm py-2.5 justify-center"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 glass-card p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedTable}</h1>
            <p className="text-gray-600">{currentTable?.ai_summary || "No summary available"}</p>
          </div>
          <div className={`px-4 py-2 rounded-xl border font-semibold ${getQualityColor(qualityScore)}`}>
            {getQualityLabel(qualityScore)} ({qualityScore}%)
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { id: "details", label: "Details", icon: Info },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "lineage", label: "Lineage", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all relative ${
                  activeTab === tab.id
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "details" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
                <div className="text-sm text-indigo-600 font-medium mb-1">Columns</div>
                <div className="text-2xl font-bold text-indigo-900">{currentTable?.columns?.length || 0}</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <div className="text-sm text-green-600 font-medium mb-1">Relationships</div>
                <div className="text-2xl font-bold text-green-900">{currentTable?.relationships?.length || 0}</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="text-sm text-purple-600 font-medium mb-1">Quality Score</div>
                <div className="text-2xl font-bold text-purple-900">{qualityScore}%</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                <div className="text-sm text-amber-600 font-medium mb-1">Row Count</div>
                <div className="text-2xl font-bold text-amber-900">
                  {currentTable?.row_count?.toLocaleString() || 'N/A'}
                </div>
              </div>
            </div>

            {/* Columns Table */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Columns</h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nullable</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Completeness</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Uniqueness</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {columnsWithMetrics.map((col: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-medium text-gray-900">{col.name}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{col.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {col.nullable ? (
                            <CheckCircle2 size={16} className="text-green-500" />
                          ) : (
                            <AlertCircle size={16} className="text-gray-400" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                              <div
                                className={`h-full rounded-full ${
                                  col.completeness >= 80 ? "bg-green-500" : col.completeness >= 60 ? "bg-amber-500" : "bg-red-500"
                                }`}
                                style={{ width: `${col.completeness}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{col.completeness}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${col.uniqueness}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{col.uniqueness}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <QualityChart data={columnsWithMetrics} />
          </div>
        )}

        {activeTab === "lineage" && (
          <div className="space-y-6">
            <RelationshipGraph relationships={currentTable?.relationships || []} tableName={selectedTable} />
          </div>
        )}
      </div>
    </div>
  );
}
