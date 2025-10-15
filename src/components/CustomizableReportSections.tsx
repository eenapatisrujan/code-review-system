import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Eye, EyeOff } from "lucide-react";
import { Switch } from "./ui/switch";

interface ReportSection {
  id: string;
  name: string;
  enabled: boolean;
}

export function CustomizableReportSections() {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<ReportSection[]>([
    { id: "summary", name: "Executive Summary", enabled: true },
    { id: "readability", name: "Code Readability", enabled: true },
    { id: "structure", name: "Structure & Modularity", enabled: true },
    { id: "bugs", name: "Bug Detection", enabled: true },
    { id: "performance", name: "Performance Metrics", enabled: true },
    { id: "algorithm", name: "Algorithmic Analysis", enabled: true },
    { id: "security", name: "Security Insights", enabled: true },
    { id: "refactoring", name: "Refactoring Suggestions", enabled: true },
    { id: "metrics", name: "Code Metrics Dashboard", enabled: false },
    { id: "simulation", name: "Performance Simulation", enabled: false }
  ]);

  const toggleSection = (id: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, enabled: !section.enabled } : section
    ));
  };

  const enabledCount = sections.filter(s => s.enabled).length;

  return (
    <div className="fixed bottom-24 right-8 z-40">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-primary-accent text-heading-text shadow-lg hover:bg-[#B6A88F] transition-all duration-200 flex items-center justify-center relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-5 h-5" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center text-xs text-white">
          {enabledCount}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-14 right-0 w-72 bg-surface border border-border-divider rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 border-b border-border-divider bg-background">
              <h3 className="text-heading-text text-sm">Customize Report</h3>
              <p className="text-subtext text-xs mt-0.5">
                Toggle sections to include in your report
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  className="px-4 py-3 border-b border-border-divider last:border-b-0 hover:bg-secondary-accent/10 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      {section.enabled ? (
                        <Eye className="w-4 h-4 text-primary-accent flex-shrink-0" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-subtext flex-shrink-0" />
                      )}
                      <span className={`text-sm ${section.enabled ? "text-heading-text" : "text-subtext"}`}>
                        {section.name}
                      </span>
                    </div>
                    <Switch
                      checked={section.enabled}
                      onCheckedChange={() => toggleSection(section.id)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="px-4 py-3 bg-background border-t border-border-divider flex gap-2">
              <button
                onClick={() => setSections(sections.map(s => ({ ...s, enabled: true })))}
                className="flex-1 px-3 py-1.5 text-xs border border-border-divider text-heading-text rounded-lg hover:bg-secondary-accent/20 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-3 py-1.5 text-xs bg-primary-accent text-heading-text rounded-lg hover:bg-[#B6A88F] transition-colors"
              >
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
