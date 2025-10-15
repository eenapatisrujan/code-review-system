import { useState, useRef } from "react";
import { Upload, ArrowRight, FileText, Type } from "lucide-react";
import { motion } from "motion/react";
import { BedowHeader } from "./BedowHeader";
import { Textarea } from "./ui/textarea";

interface BedowUploadPageProps {
  onFileUpload: (filename: string, lineCount: number) => void;
  onNavigateToReports?: () => void;
}

export function BedowUploadPage({ onFileUpload, onNavigateToReports }: BedowUploadPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [inputMode, setInputMode] = useState<"file" | "text">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleGenerateReview = async () => {
    setIsLoading(true);
    try {
      let filename = "";
      let response;
      const API_URL = "http://localhost:3001/api/analyze";
      if (inputMode === "file" && selectedFile) {
        filename = selectedFile.name;
        const formData = new FormData();
        formData.append("file", selectedFile);
        response = await fetch(API_URL, {
          method: "POST",
          body: formData,
        });
      } else if (inputMode === "text" && textInput.trim()) {
        filename = "Pasted Code";
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: textInput }),
        });
      }
      if (response && response.ok) {
        const data = await response.json();
        if (data.error) {
          setIsLoading(false);
          alert(data.error || "Failed to analyze code. Please try again.");
        } else {
          setIsLoading(false);
          onFileUpload(filename, Number(data.lineCount) || 0);
        }
      } else {
        setIsLoading(false);
        let errMsg = "Failed to analyze code. Please try again.";
        try {
          const errData = await response.json();
          if (errData && errData.error) errMsg = errData.error;
        } catch {}
        alert(errMsg);
      }
    } catch (err) {
      setIsLoading(false);
      alert("Error connecting to backend.");
    }
  };

  const canGenerate = (inputMode === "file" && selectedFile) || (inputMode === "text" && textInput.trim().length > 0);

  return (
    <div className="min-h-screen bg-background">
      <BedowHeader onNavigateToReports={onNavigateToReports} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-20">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left - Hero Text */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="label-text text-subtext mb-6">AI-Powered Analysis</p>
              <h1 className="editorial-heading text-heading-text mb-8 text-6xl md:text-8xl">
                Intelligent
                <br />
                Code Review
              </h1>
              <p className="text-body-text text-lg md:text-xl max-w-xl leading-relaxed mb-12">
                Transform your code quality with AI-driven insights. Upload any file or paste your code
                for instant, comprehensive analysis.
              </p>

              {/* Mode Toggle */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setInputMode("file");
                    setSelectedFile(null);
                    setTextInput("");
                  }}
                  className={`
                    px-6 py-3 rounded-full transition-all duration-300 label-text
                    ${inputMode === "file"
                      ? "bg-heading-text text-background"
                      : "bg-transparent text-body-text border border-border-divider hover:border-heading-text"
                    }
                  `}
                >
                  Upload File
                </button>
                <button
                  onClick={() => {
                    setInputMode("text");
                    setSelectedFile(null);
                    setTextInput("");
                  }}
                  className={`
                    px-6 py-3 rounded-full transition-all duration-300 label-text
                    ${inputMode === "text"
                      ? "bg-heading-text text-background"
                      : "bg-transparent text-body-text border border-border-divider hover:border-heading-text"
                    }
                  `}
                >
                  Paste Text
                </button>
              </div>

              {canGenerate && (
                <motion.button
                  onClick={handleGenerateReview}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-3 bg-heading-text text-background px-8 py-4 rounded-full hover:gap-5 transition-all duration-300 disabled:opacity-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="label-text">
                    {isLoading ? "Analyzing..." : "Generate Review"}
                  </span>
                  {!isLoading && (
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </motion.button>
              )}
            </motion.div>

            {/* Right - Upload Area */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {inputMode === "file" ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative border-2 border-dashed rounded-3xl p-16 cursor-pointer
                    transition-all duration-500 min-h-[400px] flex flex-col items-center justify-center
                    ${isDragging
                      ? "border-heading-text bg-heading-text/5 scale-[0.98]"
                      : "border-border-divider hover:border-heading-text/50 hover:bg-surface"
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  <motion.div
                    className="flex flex-col items-center"
                    animate={{ scale: isDragging ? 1.05 : 1 }}
                  >
                    {selectedFile ? (
                      <>
                        <FileText className="w-20 h-20 text-heading-text mb-6" />
                        <p className="text-heading-text text-center mb-2 font-serif text-xl">
                          {selectedFile.name}
                        </p>
                        <p className="label-text text-subtext">
                          Ready to analyze
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-20 h-20 text-subtext mb-6" />
                        <p className="text-heading-text text-center mb-2 font-serif text-xl">
                          Drop your file here
                        </p>
                        <p className="label-text text-subtext">
                          or click to browse
                        </p>
                      </>
                    )}
                  </motion.div>

                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-xs text-subtext text-center">
                      All file types supported • Secure & Private
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Textarea
                    placeholder="// Paste your code here&#10;function fibonacci(n) {&#10;  if (n <= 1) return n;&#10;  return fibonacci(n - 1) + fibonacci(n - 2);&#10;}"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-[400px] font-mono text-sm bg-surface border-2 border-border-divider focus-visible:border-heading-text rounded-3xl p-8 resize-none"
                  />
                  <div className="absolute bottom-4 right-4">
                    <p className="text-xs text-subtext">
                      {textInput.length} characters • {textInput.split('\n').length} lines
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 border-t border-border-divider">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                title: "Comprehensive Analysis",
                description: "Deep dive into code quality, performance, security, and best practices"
              },
              {
                title: "Instant Insights",
                description: "Get actionable recommendations and refactoring suggestions in seconds"
              },
              {
                title: "Visual Reports",
                description: "Beautiful, exportable reports with metrics, charts, and comparisons"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <h3 className="font-serif text-2xl text-heading-text mb-4">
                  {feature.title}
                </h3>
                <p className="text-body-text leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
