import { motion } from "motion/react";
import { BedowHeader } from "./BedowHeader";
import { FileText, TrendingUp, TrendingDown } from "lucide-react";

interface BedowHistoryPageProps {
  onBack: () => void;
  onSelectReport: (filename: string) => void;
  reports: { filename: string; date: string; time: string; }[];
}

export function BedowHistoryPage({ onBack, onSelectReport, reports }: BedowHistoryPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <BedowHeader onNavigateHome={onBack} />

      <section className="pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-text text-subtext mb-6">Your Dashboard</p>
            <h1 className="editorial-heading text-heading-text mb-16 text-5xl md:text-7xl">
              Review
              <br />
              History
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <div className="border-l-2 border-heading-text pl-6">
                <p className="text-5xl font-serif text-heading-text mb-2">24</p>
                <p className="label-text text-subtext">Total Reviews</p>
              </div>
              <div className="border-l-2 border-primary-accent pl-6">
                <p className="text-5xl font-serif text-heading-text mb-2">82%</p>
                <p className="label-text text-subtext">Avg Score</p>
              </div>
              <div className="border-l-2 border-success pl-6">
                <p className="text-5xl font-serif text-heading-text mb-2">143</p>
                <p className="label-text text-subtext">Issues Fixed</p>
              </div>
              <div className="border-l-2 border-border-divider pl-6">
                <p className="text-5xl font-serif text-heading-text mb-2">8</p>
                <p className="label-text text-subtext">This Month</p>
              </div>
            </div>
          </motion.div>

          {/* History List */}
          <div className="space-y-0 border-t border-border-divider">
            {reports.length === 0 ? (
              <div className="text-center text-subtext py-12">
                No reports found. Upload code to generate your first report.
              </div>
            ) : (
              reports.map((report, index) => (
                <motion.div
                  key={report.filename + report.date + report.time}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-border-divider cursor-pointer group hover:bg-surface transition-all duration-300"
                  onClick={() => onSelectReport(report.filename)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="md:col-span-1 flex items-center">
                    <span className="text-4xl font-serif text-subtext group-hover:text-heading-text transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="md:col-span-5">
                    <h3 className="text-2xl font-serif text-heading-text mb-2 group-hover:text-primary-accent transition-colors">
                      {report.filename}
                    </h3>
                    <p className="label-text text-subtext">{report.date} at {report.time}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
