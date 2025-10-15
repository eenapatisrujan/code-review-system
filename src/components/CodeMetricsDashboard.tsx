import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Code, FileCode, GitBranch, AlertCircle } from "lucide-react";

const complexityData = [
  { name: "Low", value: 45, color: "#9BA88C" },
  { name: "Medium", value: 35, color: "#CBBBA0" },
  { name: "High", value: 20, color: "#C16868" }
];

const functionsData = [
  { name: "Auth", complexity: 8 },
  { name: "Data", complexity: 12 },
  { name: "Utils", complexity: 5 },
  { name: "API", complexity: 15 },
  { name: "Render", complexity: 7 }
];

export function CodeMetricsDashboard() {
  return (
    <motion.div
      className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-heading-text mb-6 flex items-center gap-2">
        <Code className="w-5 h-5 text-primary-accent" />
        Code Metrics Dashboard
      </h2>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileCode className="w-4 h-4 text-primary-accent" />
            <span className="text-subtext text-sm">Total Lines</span>
          </div>
          <div className="text-2xl text-heading-text">1,247</div>
          <div className="text-xs text-subtext mt-1">342 executable</div>
        </div>

        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-primary-accent" />
            <span className="text-subtext text-sm">Functions</span>
          </div>
          <div className="text-2xl text-heading-text">24</div>
          <div className="text-xs text-subtext mt-1">18 documented</div>
        </div>

        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-4 h-4 text-primary-accent" />
            <span className="text-subtext text-sm">Avg Complexity</span>
          </div>
          <div className="text-2xl text-heading-text">8.4</div>
          <div className="text-xs text-subtext mt-1">Moderate</div>
        </div>

        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-primary-accent" />
            <span className="text-subtext text-sm">Dependencies</span>
          </div>
          <div className="text-2xl text-heading-text">12</div>
          <div className="text-xs text-subtext mt-1">2 outdated</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Complexity Distribution */}
        <div>
          <h3 className="text-heading-text mb-4 text-sm">Complexity Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={complexityData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {complexityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E8E6E3',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-3">
            {complexityData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-subtext">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Function Complexity */}
        <div>
          <h3 className="text-heading-text mb-4 text-sm">Cyclomatic Complexity by Function</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={functionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E3" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#7A7A7A', fontSize: 12 }}
                stroke="#E8E6E3"
              />
              <YAxis 
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
              <Bar dataKey="complexity" fill="#CBBBA0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
