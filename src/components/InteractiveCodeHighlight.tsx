import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Lightbulb, X } from "lucide-react";

interface CodeIssue {
  line: number;
  type: "error" | "warning";
  message: string;
  suggestion: string;
}

const codeIssues: CodeIssue[] = [
  {
    line: 3,
    type: "error",
    message: "Potential null pointer exception",
    suggestion: "Add null check: if (data !== null) { ... }"
  },
  {
    line: 7,
    type: "warning",
    message: "Inefficient loop implementation",
    suggestion: "Use array.map() instead of manual iteration"
  }
];

const codeLines = [
  "function processData(data) {",
  "  let result = [];",
  "  // Missing null check here",
  "  for (let i = 0; i < data.length; i++) {",
  "    result.push(data[i] * 2);",
  "  }",
  "  // Could be optimized with map()",
  "  return result;",
  "}"
];

export function InteractiveCodeHighlight() {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<CodeIssue | null>(null);

  const getIssueForLine = (lineNumber: number) => {
    return codeIssues.find(issue => issue.line === lineNumber);
  };

  return (
    <motion.div
      className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading-text flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary-accent" />
          Interactive Code Analysis
        </h2>
        <span className="text-subtext text-sm">Hover over highlighted lines for suggestions</span>
      </div>

      <div className="relative">
        <div className="bg-background rounded-lg p-4 font-mono text-sm overflow-x-auto">
          {codeLines.map((line, index) => {
            const lineNumber = index + 1;
            const issue = getIssueForLine(lineNumber);
            const isHighlighted = issue !== undefined;
            const isHovered = hoveredLine === lineNumber;

            return (
              <div
                key={lineNumber}
                className={`
                  relative flex items-start gap-4 py-1 px-2 rounded transition-all duration-200
                  ${isHighlighted ? (issue.type === "error" ? "bg-error/5 hover:bg-error/10" : "bg-primary-accent/5 hover:bg-primary-accent/10") : ""}
                  ${isHovered ? "scale-[1.01]" : ""}
                `}
                onMouseEnter={() => isHighlighted && setHoveredLine(lineNumber)}
                onMouseLeave={() => setHoveredLine(null)}
                onClick={() => isHighlighted && setSelectedIssue(issue)}
              >
                <span className="text-subtext select-none w-8 text-right flex-shrink-0">
                  {lineNumber}
                </span>
                <span className={`flex-1 ${isHighlighted ? "text-heading-text" : "text-body-text"}`}>
                  {line}
                </span>
                {isHighlighted && (
                  <AlertTriangle 
                    className={`w-4 h-4 flex-shrink-0 mt-0.5 ${issue.type === "error" ? "text-error" : "text-primary-accent"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredLine !== null && (
            <motion.div
              className="absolute left-full ml-4 top-0 bg-surface border border-border-divider rounded-lg p-4 shadow-lg w-80 z-10"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {(() => {
                const issue = getIssueForLine(hoveredLine);
                if (!issue) return null;
                return (
                  <>
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${issue.type === "error" ? "text-error" : "text-primary-accent"}`} />
                      <div>
                        <div className="text-heading-text text-sm mb-1">Line {issue.line}</div>
                        <div className="text-body-text text-sm">{issue.message}</div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border-divider">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-success text-xs mb-1">Suggestion</div>
                          <div className="text-body-text text-sm font-mono">{issue.suggestion}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Issue Modal */}
        <AnimatePresence>
          {selectedIssue && (
            <motion.div
              className="fixed inset-0 bg-overlay backdrop-blur-sm z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIssue(null)}
            >
              <motion.div
                className="bg-surface rounded-2xl p-6 max-w-2xl w-full border border-border-divider shadow-xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-heading-text">Issue Details - Line {selectedIssue.line}</h3>
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="text-subtext hover:text-heading-text transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-subtext text-sm mb-2 block">Problem</label>
                    <div className="bg-background rounded-lg p-3 text-body-text">
                      {selectedIssue.message}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-subtext text-sm mb-2 block">Suggested Fix</label>
                    <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-body-text font-mono text-sm">
                      {selectedIssue.suggestion}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 px-4 py-2 bg-primary-accent text-heading-text rounded-lg hover:bg-[#B6A88F] transition-colors">
                      Apply Fix
                    </button>
                    <button className="flex-1 px-4 py-2 border border-border-divider text-heading-text rounded-lg hover:bg-secondary-accent/20 transition-colors">
                      View Full Example
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
