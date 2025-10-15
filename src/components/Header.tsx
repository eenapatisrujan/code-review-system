import { ArrowLeft, FileText, BookOpen, User } from "lucide-react";

interface HeaderProps {
  variant?: "upload" | "review";
  filename?: string;
  onBack?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  onNavigateToReports?: () => void;
}

export function Header({ variant = "upload", filename, onBack, onCopy, onDownload, onNavigateToReports }: HeaderProps) {
  if (variant === "upload") {
    return (
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-sm border-b border-border-divider transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-accent flex items-center justify-center">
              <span className="text-heading-text font-semibold text-sm">CR</span>
            </div>
            <span className="text-heading-text font-semibold text-lg">CodeReview.AI</span>
          </div>
          <nav className="flex items-center gap-8">
            <button 
              onClick={onNavigateToReports}
              className="text-body-text hover:text-heading-text transition-colors duration-200"
            >
              Reports
            </button>
            <a href="#" className="text-body-text hover:text-heading-text transition-colors duration-200">
              Documentation
            </a>
            <button className="w-9 h-9 rounded-full bg-secondary-accent flex items-center justify-center hover:bg-primary-accent transition-colors duration-200">
              <User className="w-4 h-4 text-heading-text" />
            </button>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-surface shadow-sm border-b border-border-divider">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-body-text hover:text-heading-text transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Upload Another File</span>
            </button>
            <div className="h-6 w-px bg-border-divider" />
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-subtext" />
              <span className="text-heading-text font-medium">{filename || "Review Report"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCopy}
              className="px-4 py-2 rounded-lg border border-primary-accent text-heading-text hover:bg-primary-accent/10 transition-all duration-200"
            >
              Copy Report
            </button>
            <button
              onClick={onDownload}
              className="px-4 py-2 rounded-lg bg-primary-accent text-heading-text hover:bg-[#B6A88F] transition-all duration-200 hover:scale-[1.02]"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
