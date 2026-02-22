"use client";

import { Database, ArrowRight, Link2 } from "lucide-react";

interface RelationshipGraphProps {
  relationships: any[];
  tableName: string;
}

export function RelationshipGraph({ relationships, tableName }: RelationshipGraphProps) {
  if (!relationships || relationships.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <Link2 className="mx-auto text-gray-300 mb-4" size={48} />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Relationships Found</h3>
        <p className="text-gray-600">This table doesn't have any foreign key relationships</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Table Relationships</h3>
        <p className="text-gray-600">Foreign key connections and data lineage</p>
      </div>

      {/* Visual Graph */}
      <div className="glass-card p-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Current Table */}
          <div className="flex items-center justify-center">
            <div className="px-8 py-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-xl shadow-indigo-500/30 animate-scale-in">
              <div className="flex items-center gap-3">
                <Database size={28} />
                <div>
                  <div className="text-sm font-medium opacity-90">Current Table</div>
                  <div className="text-2xl font-bold">{tableName}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Relationships */}
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
            {relationships.map((rel, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all group animate-slide-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Arrow Indicator */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-indigo-500 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <ArrowRight size={16} />
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white shadow-sm">
                    <Database size={24} className="text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg mb-2">{rel.referenced_table}</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 font-mono text-xs">
                          {rel.column}
                        </span>
                        <ArrowRight size={14} className="text-gray-400" />
                        <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-600 font-mono text-xs">
                          {rel.referenced_column}
                        </span>
                      </div>
                      <div className="text-gray-600 mt-2">
                        Foreign Key Relationship
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Relationship Details Table */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Relationship Details</h4>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Column
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  References
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Referenced Column
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {relationships.map((rel, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                      {rel.column}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">{rel.referenced_table}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">
                      {rel.referenced_column}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-600 border border-green-200">
                      Foreign Key
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
