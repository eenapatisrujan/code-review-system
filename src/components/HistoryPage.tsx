import { motion } from "motion/react";
import { BedowHeader } from "./BedowHeader";
import { FileText, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

interface HistoryPageProps {
  onBack: () => void;
  onSelectReport: (filename: string) => void;
  reports: { filename: string; date: string; time: string; }[];
}

export function HistoryPage({ onBack, onSelectReport, reports }: HistoryPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <BedowHeader onNavigateHome={onBack} />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
            </div>
            {/* Removed New Review button */}
          </div>
          {/* History List */}
          <motion.div
            className="bg-surface rounded-2xl border border-border-divider overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="px-6 py-4 border-b border-border-divider">
              <h2 className="text-heading-text">Recent Reviews</h2>
            </div>
            <div className="divide-y divide-border-divider">
              {reports.length === 0 ? (
                <div className="text-center text-subtext py-12">No reports found. Upload code to generate your first report.</div>
              ) : (
                reports.map((report, index) => (
                  <motion.div
                    key={report.filename + report.date + report.time}
                    className="px-6 py-4 hover:bg-secondary-accent/10 transition-colors duration-200 cursor-pointer"
                    onClick={() => onSelectReport(report.filename)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-secondary-accent/30 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-heading-text" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-heading-text truncate">{report.filename}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-subtext">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {report.date} at {report.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">Real-Time</Badge>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
