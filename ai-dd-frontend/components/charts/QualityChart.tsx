"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface QualityChartProps {
  data: any[];
}

export function QualityChart({ data }: QualityChartProps) {
  const chartData = data.map((col) => ({
    name: col.name.length > 15 ? col.name.substring(0, 15) + "..." : col.name,
    completeness: col.completeness || 0,
    uniqueness: col.uniqueness || 0,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Data Quality Metrics</h3>
        <p className="text-gray-600">Completeness and uniqueness analysis for each column</p>
      </div>

      <div className="glass-card p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={100}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="completeness" 
              fill="#6366f1" 
              radius={[8, 8, 0, 0]}
              name="Completeness"
            />
            <Bar 
              dataKey="uniqueness" 
              fill="#8b5cf6" 
              radius={[8, 8, 0, 0]}
              name="Uniqueness"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
          <div className="text-sm text-indigo-600 font-semibold mb-2">Average Completeness</div>
          <div className="text-3xl font-bold text-indigo-900">
            {Math.round(data.reduce((sum, col) => sum + (col.completeness || 0), 0) / data.length)}%
          </div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
          <div className="text-sm text-purple-600 font-semibold mb-2">Average Uniqueness</div>
          <div className="text-3xl font-bold text-purple-900">
            {Math.round(data.reduce((sum, col) => sum + (col.uniqueness || 0), 0) / data.length)}%
          </div>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
          <div className="text-sm text-green-600 font-semibold mb-2">High Quality Columns</div>
          <div className="text-3xl font-bold text-green-900">
            {data.filter((col) => (col.completeness || 0) >= 80).length}
          </div>
        </div>
      </div>
    </div>
  );
}
