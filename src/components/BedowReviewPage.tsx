import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BedowHeader } from "./BedowHeader";
import { ArrowLeft, Download, Copy, CheckCircle2, AlertTriangle, TrendingUp, Shield } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface BedowReviewPageProps {
  filename: string;
  lineCount: number;
  onBack: () => void;
}

const performanceData = [
  { size: "100", current: 0.002, optimized: 0.001 },
  { size: "1K", current: 0.2, optimized: 0.02 },
  { size: "10K", current: 42, optimized: 0.28 },
  { size: "50K", current: 1050, optimized: 1.8 }
];

const complexityData = [
  { name: "Low", value: 45, color: "#9BA88C" },
  { name: "Medium", value: 35, color: "#CBBBA0" },
  { name: "High", value: 20, color: "#C16868" }
];

export function BedowReviewPage({ filename, lineCount, onBack }: BedowReviewPageProps) {
  const [showFloatingActions, setShowFloatingActions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingActions(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    toast.success("Copied to clipboard");
  };

  const handleDownload = () => {
    toast.success("PDF Downloaded Successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <BedowHeader onNavigateHome={onBack} />

      {/* Fixed Action Bar */}
      <motion.div
        className="fixed top-20 right-8 md:right-16 z-40 flex gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: showFloatingActions ? 1 : 0,
          y: showFloatingActions ? 0 : -10,
          pointerEvents: showFloatingActions ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleCopy}
          className="p-4 bg-surface border border-border-divider rounded-full hover:bg-heading-text hover:text-background transition-all duration-300 group"
        >
          <Copy className="w-5 h-5" />
        </button>
        <button
          onClick={handleDownload}
          className="p-4 bg-heading-text text-background rounded-full hover:bg-heading-text/90 transition-all duration-300 group"
        >
          <Download className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-body-text hover:text-heading-text transition-colors duration-300 mb-12 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="label-text">Back to Upload</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-text text-subtext mb-6">Analysis Complete</p>
            <h1 className="editorial-heading text-heading-text mb-6 text-5xl md:text-7xl">
              {filename}
            </h1>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-2xl text-success font-serif">A</span>
                </div>
                <div>
                  <p className="label-text text-subtext">Overall Grade</p>
                  <p className="text-heading-text">Excellent Quality</p>
                </div>
              </div>
              <div className="h-12 w-px bg-border-divider"></div>
              <div>
                <p className="label-text text-subtext">Lines of Code</p>
                <p className="text-heading-text text-2xl font-serif">{lineCount.toLocaleString()}</p>
              </div>
              <div className="h-12 w-px bg-border-divider"></div>
              <div>
                <p className="label-text text-subtext">Issues Found</p>
                <p className="text-heading-text text-2xl font-serif">3</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Executive Summary - Full Width */}
      <section className="py-20 bg-surface border-y border-border-divider">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="lg:col-span-4">
              <h2 className="font-serif text-3xl text-heading-text mb-4">
                Executive Summary
              </h2>
              <p className="label-text text-primary-accent">
                AI-Generated Overview
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="text-body-text text-xl leading-relaxed">
                The reviewed code demonstrates good fundamental structure and readability. The logic is generally sound,
                with clear variable naming and appropriate comments. However, there are opportunities for optimization
                in algorithmic efficiency and modularity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Code Quality Metrics */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-heading-text mb-16">
              Quality Metrics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Readability", score: 85 },
                { label: "Maintainability", score: 78 },
                { label: "Performance", score: 65 },
                { label: "Security", score: 82 }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-5xl md:text-6xl font-serif text-heading-text mb-3">
                    {metric.score}
                  </div>
                  <p className="label-text text-subtext">{metric.label}</p>
                  <div className="mt-4 h-1 bg-border-divider rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Complexity Chart */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="font-serif text-3xl text-heading-text mb-6">
                  Complexity Distribution
                </h3>
                <p className="text-body-text text-lg leading-relaxed mb-8">
                  Analysis of code complexity across your codebase, identifying areas that may benefit from refactoring.
                </p>
                <div className="space-y-4">
                  {complexityData.map((item) => (
                    <div key={item.name} className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-body-text">{item.name}</span>
                      <span className="text-heading-text font-serif ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complexityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {complexityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Issues Section */}
      <section className="py-32 bg-surface border-y border-border-divider">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-heading-text mb-16">
              Identified Issues
            </h2>

            <div className="space-y-8">
              {[
                {
                  severity: "High",
                  title: "Potential Null Pointer Exception",
                  description: "Array access without null check on user input at line 47",
                  icon: AlertTriangle,
                  color: "error"
                },
                {
                  severity: "Medium",
                  title: "Inefficient Algorithm",
                  description: "Nested loops creating O(n²) complexity - can be optimized to O(n)",
                  icon: TrendingUp,
                  color: "primary-accent"
                },
                {
                  severity: "Low",
                  title: "Missing Input Validation",
                  description: "Function doesn't handle empty array input at line 89",
                  icon: Shield,
                  color: "subtext"
                }
              ].map((issue, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-border-divider last:border-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3">
                      <issue.icon className={`w-6 h-6 text-${issue.color}`} />
                      <span className="label-text text-subtext">{issue.severity} Priority</span>
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-heading-text text-2xl font-serif mb-3">
                      {issue.title}
                    </h3>
                    <p className="text-body-text text-lg mb-6">
                      {issue.description}
                    </p>
                    <button
                      onClick={() => toast.success("Applied fix successfully")}
                      className="label-text px-6 py-3 bg-heading-text text-background rounded-full hover:bg-heading-text/90 transition-all duration-300"
                    >
                      Apply Fix
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance Chart */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-4xl md:text-5xl text-heading-text mb-6">
                  Performance
                  <br />
                  Analysis
                </h2>
                <p className="text-body-text text-lg leading-relaxed">
                  Comparison between current implementation and optimized approach across different input sizes.
                </p>
              </div>
              <div className="lg:col-span-7 flex items-center">
                <div className="grid grid-cols-2 gap-12 w-full">
                  <div>
                    <p className="label-text text-subtext mb-3">Current</p>
                    <p className="text-5xl font-serif text-error mb-2">O(n²)</p>
                    <p className="text-body-text">Brute force</p>
                  </div>
                  <div>
                    <p className="label-text text-success mb-3">Optimized</p>
                    <p className="text-5xl font-serif text-success mb-2">O(n)</p>
                    <p className="text-body-text">Dynamic programming</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-96 bg-surface rounded-3xl p-8 border border-border-divider">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E3" />
                  <XAxis
                    dataKey="size"
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
                      borderRadius: '12px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#C16868"
                    strokeWidth={3}
                    dot={{ fill: '#C16868', r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="optimized"
                    stroke="#9BA88C"
                    strokeWidth={3}
                    dot={{ fill: '#9BA88C', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-32 bg-heading-text text-background">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-16 text-white">
              Key Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {[
                "Extract repeated validation logic into reusable utility functions",
                "Implement memoization to cache results and reduce redundant calculations",
                "Break down large functions into smaller, testable units",
                "Add comprehensive error handling with specific error messages",
                "Replace nested loops with more efficient data structures",
                "Add unit tests to ensure code reliability"
              ].map((rec, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="font-serif text-2xl text-white/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-lg text-white leading-relaxed pt-1">
                    {rec}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={onBack}
              className="inline-flex items-center gap-3 bg-heading-text text-background px-8 py-4 rounded-full hover:bg-heading-text/90 transition-all duration-300"
            >
              <span className="label-text">Review Another File</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
