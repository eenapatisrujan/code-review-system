import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Zap, TrendingDown } from "lucide-react";

const performanceData = [
  { size: "100", current: 0.002, optimized: 0.001 },
  { size: "500", current: 0.05, optimized: 0.008 },
  { size: "1K", current: 0.2, optimized: 0.02 },
  { size: "5K", current: 5.2, optimized: 0.12 },
  { size: "10K", current: 42, optimized: 0.28 },
  { size: "50K", current: 1050, optimized: 1.8 }
];

export function PerformanceSimulation() {
  return (
    <motion.div
      className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-heading-text mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-accent" />
            Performance Simulation
          </h2>
          <p className="text-body-text text-sm">
            Runtime comparison: Current implementation vs. Optimized approach
          </p>
        </div>
        <div className="bg-success/10 border border-success/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-success" />
          <span className="text-success text-sm">95% faster</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E3" />
            <XAxis 
              dataKey="size" 
              label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5, fill: '#7A7A7A' }}
              tick={{ fill: '#7A7A7A', fontSize: 12 }}
              stroke="#E8E6E3"
            />
            <YAxis 
              label={{ value: 'Runtime (seconds)', angle: -90, position: 'insideLeft', fill: '#7A7A7A' }}
              tick={{ fill: '#7A7A7A', fontSize: 12 }}
              stroke="#E8E6E3"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E8E6E3',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="#C16868" 
              strokeWidth={2}
              name="Current (O(n²))"
              dot={{ fill: '#C16868', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="optimized" 
              stroke="#9BA88C" 
              strokeWidth={2}
              name="Optimized (O(n))"
              dot={{ fill: '#9BA88C', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comparison Table */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-error/5 border border-error/20 rounded-lg p-4">
          <div className="text-subtext text-sm mb-2">Current Approach</div>
          <div className="text-heading-text text-lg mb-1">O(n²)</div>
          <div className="text-body-text text-sm">Nested loops, brute force</div>
          <div className="mt-3 pt-3 border-t border-error/20">
            <div className="text-xs text-subtext">10K elements</div>
            <div className="text-error">42 seconds</div>
          </div>
        </div>

        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="text-subtext text-sm mb-2">Optimized Approach</div>
          <div className="text-heading-text text-lg mb-1">O(n)</div>
          <div className="text-body-text text-sm">Dynamic programming</div>
          <div className="mt-3 pt-3 border-t border-success/20">
            <div className="text-xs text-subtext">10K elements</div>
            <div className="text-success">0.28 seconds</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
