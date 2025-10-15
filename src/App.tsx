import { useState } from "react";
import { BedowUploadPage } from "./components/BedowUploadPage";
import { BedowReviewPage } from "./components/BedowReviewPage";
import { HistoryPage } from "./components/HistoryPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"upload" | "review" | "history">("upload");
  const [uploadedFilename, setUploadedFilename] = useState<string>("");
  const [uploadedLineCount, setUploadedLineCount] = useState<number>(0);
  // Add reports state
  const [reports, setReports] = useState<{ filename: string; date: string; time: string; }[]>([]);

  const handleFileUpload = (filename: string, lineCount: number) => {
    setUploadedFilename(filename);
    setUploadedLineCount(lineCount);
    setCurrentPage("review");
    // Add new report to reports list with current date/time
    const now = new Date();
    setReports(prev => [
      ...prev,
      {
        filename,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToUpload = () => {
    setCurrentPage("upload");
    setUploadedFilename("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToHistory = () => {
    setCurrentPage("history");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectReportFromHistory = (filename: string) => {
    setUploadedFilename(filename);
    setCurrentPage("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {currentPage === "upload" && (
        <BedowUploadPage 
          onFileUpload={handleFileUpload} 
          onNavigateToReports={handleNavigateToHistory}
        />
      )}
      {currentPage === "review" && (
        <BedowReviewPage 
          filename={uploadedFilename} 
          lineCount={uploadedLineCount}
          onBack={handleBackToUpload} 
        />
      )}
      {currentPage === "history" && (
        <HistoryPage 
          onBack={handleBackToUpload}
          onSelectReport={handleSelectReportFromHistory}
          reports={reports}
        />
      )}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1E1E1E',
            color: '#F7F5F2',
            border: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </>
  );
}
