import { motion } from "motion/react";

interface BedowHeaderProps {
  onNavigateToReports?: () => void;
  onNavigateHome?: () => void;
}

export function BedowHeader({ onNavigateToReports, onNavigateHome }: BedowHeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-divider"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 py-6 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="group flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-heading-text flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <span className="text-background font-serif text-sm">CR</span>
          </div>
          <span className="text-heading-text text-xl tracking-tight font-light hidden md:block">
            CodeSage
          </span>
        </button>

        <nav className="flex items-center gap-12">
          <button
            onClick={onNavigateToReports}
            className="label-text text-body-text hover:text-heading-text transition-colors duration-300 relative group"
          >
            Reports
            <span className="absolute bottom-0 left-0 w-0 h-px bg-heading-text transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
