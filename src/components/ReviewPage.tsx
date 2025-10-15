import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Header } from "./Header";
import { ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, TrendingUp, Code, Zap, Sparkles } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { CodeMetricsDashboard } from "./CodeMetricsDashboard";
import { InteractiveCodeHighlight } from "./InteractiveCodeHighlight";
import { SecurityInsights } from "./SecurityInsights";
import { PerformanceSimulation } from "./PerformanceSimulation";
import { CustomizableReportSections } from "./CustomizableReportSections";

interface ReviewPageProps {
  filename: string;
  onBack: () => void;
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="bg-surface rounded-2xl border border-border-divider overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary-accent/20 transition-colors duration-200"
      >
        <h3 className="text-heading-text flex items-center gap-2">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-subtext" />
        ) : (
          <ChevronDown className="w-5 h-5 text-subtext" />
        )}
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ReviewPage({ filename, onBack }: ReviewPageProps) {
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingToolbar(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    toast.success("Copied to clipboard", {
      duration: 2000,
    });
  };

  const handleDownload = () => {
    toast.success("PDF Downloaded Successfully", {
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        variant="review" 
        filename={filename}
        onBack={onBack}
        onCopy={handleCopy}
        onDownload={handleDownload}
      />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Executive Summary */}
        <motion.div
          className="bg-surface rounded-2xl p-6 border border-border-divider mb-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-accent"></div>
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-heading-text">Executive Summary</h2>
            <Badge className="bg-secondary-accent text-heading-text border-0">
              Comprehensive Review Generated
            </Badge>
          </div>
          <p className="text-body-text leading-relaxed">
            The reviewed code demonstrates good fundamental structure and readability. The logic is generally sound, 
            with clear variable naming and appropriate comments. However, there are opportunities for optimization 
            in algorithmic efficiency and modularity. The current implementation uses a brute-force approach that 
            could be improved with dynamic programming techniques for better time complexity.
          </p>
        </motion.div>

        {/* Code Readability & Maintainability */}
        <motion.div
          className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h2 className="text-heading-text mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary-accent" />
            Code Readability & Maintainability
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-body-text">
                  <span className="text-heading-text">Good:</span> Variable names are descriptive and follow consistent naming conventions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-body-text">
                  <span className="text-heading-text">Good:</span> Functions are properly documented with clear comments
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-body-text">
                  <span className="text-heading-text">Needs Improvement:</span> Some functions exceed 50 lines and could be broken into smaller, reusable components
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Structure & Modularity Analysis */}
        <motion.div
          className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-heading-text mb-4">Structure & Modularity Analysis</h2>
          <p className="text-body-text leading-relaxed mb-4">
            The code demonstrates a functional approach with clear separation of concerns. However, 
            extracting repeated logic into utility functions would improve reusability and reduce code duplication.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl text-heading-text mb-1">8/10</div>
              <div className="text-subtext text-sm">Modularity</div>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl text-heading-text mb-1">7/10</div>
              <div className="text-subtext text-sm">Reusability</div>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <div className="text-2xl text-heading-text mb-1">9/10</div>
              <div className="text-subtext text-sm">Organization</div>
            </div>
          </div>
        </motion.div>

        {/* Bug & Error Detection */}
        <motion.div
          className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h2 className="text-heading-text mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-error" />
            Bug & Error Detection
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-error/5 rounded-lg border border-error/20">
              <div className="w-6 h-6 rounded-full bg-error/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-error text-xs">1</span>
              </div>
              <div>
                <p className="text-heading-text text-sm mb-1">Potential Null Pointer Exception</p>
                <p className="text-subtext text-sm">Line 47: Array access without null check on user input</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-error/5 rounded-lg border border-error/20">
              <div className="w-6 h-6 rounded-full bg-error/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-error text-xs">2</span>
              </div>
              <div>
                <p className="text-heading-text text-sm mb-1">Missing Edge Case Handling</p>
                <p className="text-subtext text-sm">Line 89: Function doesn't handle empty array input</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance & Scalability */}
        <motion.div
          className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h2 className="text-heading-text mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-accent" />
            Performance & Scalability
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-text text-sm">Memory Efficiency</span>
                <span className="text-heading-text text-sm">75%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary-accent rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-text text-sm">Execution Speed</span>
                <span className="text-heading-text text-sm">65%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary-accent rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-text text-sm">Scalability</span>
                <span className="text-heading-text text-sm">60%</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary-accent rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Algorithmic Analysis - Collapsible */}
        <CollapsibleSection title="Algorithmic Analysis ▼" defaultOpen={true}>
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-subtext text-sm mb-2 block">Time Complexity</label>
                <div className="bg-secondary-accent/30 px-4 py-2 rounded-lg">
                  <span className="text-heading-text">O(n²)</span>
                </div>
              </div>
              <div>
                <label className="text-subtext text-sm mb-2 block">Space Complexity</label>
                <div className="bg-secondary-accent/30 px-4 py-2 rounded-lg">
                  <span className="text-heading-text">O(n)</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-subtext text-sm mb-2 block">Current Method</label>
              <div className="bg-background px-4 py-2 rounded-lg">
                <span className="text-body-text">Brute Force</span>
              </div>
            </div>

            <div>
              <label className="text-subtext text-sm mb-2 block flex items-center gap-2">
                <Zap className="w-4 h-4 text-success" />
                Suggested Efficient Method
              </label>
              <div className="bg-success/10 border border-success/20 px-4 py-2 rounded-lg">
                <span className="text-heading-text">Dynamic Programming</span>
              </div>
            </div>

            <div>
              <label className="text-subtext text-sm mb-3 block">Estimated Runtime Comparison</label>
              <div className="overflow-hidden rounded-lg border border-border-divider">
                <table className="w-full">
                  <thead className="bg-background">
                    <tr>
                      <th className="px-4 py-3 text-left text-subtext text-sm">Input Size</th>
                      <th className="px-4 py-3 text-left text-subtext text-sm">Estimated Runtime</th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface">
                    <tr className="border-t border-border-divider">
                      <td className="px-4 py-3 text-body-text">Small (n = 100)</td>
                      <td className="px-4 py-3 text-heading-text">0.002s</td>
                    </tr>
                    <tr className="border-t border-border-divider">
                      <td className="px-4 py-3 text-body-text">Medium (n = 1,000)</td>
                      <td className="px-4 py-3 text-heading-text">1.2s</td>
                    </tr>
                    <tr className="border-t border-border-divider">
                      <td className="px-4 py-3 text-body-text">Large (n = 10,000)</td>
                      <td className="px-4 py-3 text-heading-text">42s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Code Metrics Dashboard */}
        <CodeMetricsDashboard />

        {/* Interactive Code Highlighting */}
        <InteractiveCodeHighlight />

        {/* Security Insights */}
        <SecurityInsights />

        {/* Performance Simulation */}
        <PerformanceSimulation />

        {/* Refactoring Recommendations with Actions */}
        <motion.div
          className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <h2 className="text-heading-text mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-accent" />
            Refactoring Recommendations
          </h2>
          <div className="space-y-4">
            {[
              "Extract repeated validation logic into a reusable utility function",
              "Implement memoization to cache results and reduce redundant calculations",
              "Break down the main processing function into smaller, testable units",
              "Add comprehensive error handling with specific error messages",
              "Consider using a more efficient data structure (e.g., HashMap instead of nested loops)"
            ].map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border-divider">
                <div className="w-6 h-6 rounded-full bg-primary-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-accent text-xs">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-body-text leading-relaxed mb-3">{recommendation}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toast.success("Applied suggestion successfully")}
                      className="px-3 py-1.5 text-xs bg-primary-accent text-heading-text rounded-lg hover:bg-[#B6A88F] transition-colors"
                    >
                      Apply Suggestion
                    </button>
                    <button 
                      onClick={() => toast.info("Opening refactored example...")}
                      className="px-3 py-1.5 text-xs border border-border-divider text-heading-text rounded-lg hover:bg-secondary-accent/20 transition-colors"
                    >
                      View Example Refactor
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final Suggestions */}
        <motion.div
          className="bg-secondary-accent/20 rounded-2xl p-8 border border-primary-accent/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <h2 className="text-heading-text mb-3">Final Suggestions</h2>
          <p className="text-body-text leading-relaxed text-lg">
            The reviewed code is functional and readable but can be optimized using modular functions and 
            better time complexity approaches. By implementing the suggested dynamic programming solution 
            and refactoring recommendations, you can achieve up to 95% performance improvement on large datasets.
          </p>
        </motion.div>
      </main>

      {/* Floating Toolbar */}
      <motion.div
        className="fixed bottom-8 right-8 flex items-center gap-3 bg-surface shadow-lg rounded-lg p-3 border border-border-divider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showFloatingToolbar ? 1 : 0,
          y: showFloatingToolbar ? 0 : 20,
          pointerEvents: showFloatingToolbar ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg border border-primary-accent text-heading-text hover:bg-primary-accent/10 transition-all duration-200"
        >
          Copy
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-lg bg-primary-accent text-heading-text hover:bg-[#B6A88F] transition-all duration-200"
        >
          Download
        </button>
      </motion.div>

      {/* Customizable Report Sections */}
      <CustomizableReportSections />
    </div>
  );
}
