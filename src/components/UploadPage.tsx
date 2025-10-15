import { useState, useRef } from "react";
import { Upload, FileCode, Loader2, FileText, Type } from "lucide-react";
import { motion } from "motion/react";
import { Header } from "./Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Textarea } from "./ui/textarea";

interface UploadPageProps {
  onFileUpload: (filename: string) => void;
  onNavigateToReports?: () => void;
}

export function UploadPage({ onFileUpload, onNavigateToReports }: UploadPageProps) {
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
          onFileUpload(filename);
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
      <Header variant="upload" onNavigateToReports={onNavigateToReports} />
      
      <motion.main
        className="max-w-4xl mx-auto px-6 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.h1
            className="text-heading-text mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Automate Code Reviews with Intelligence
          </motion.h1>
          <motion.p
            className="text-body-text max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Upload your code and receive a structured, detailed, and professional analysis instantly.
          </motion.p>
        </div>

        <motion.div
          className="bg-surface rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Tabs 
            defaultValue="file" 
            className="w-full"
            onValueChange={(value) => {
              setInputMode(value as "file" | "text");
              setSelectedFile(null);
              setTextInput("");
            }}
          >
            <TabsList className="w-full mb-6 bg-background border border-border-divider p-1">
              <TabsTrigger value="file" className="flex-1 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload File
              </TabsTrigger>
              <TabsTrigger value="text" className="flex-1 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Paste Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="mt-0">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-xl p-16 text-center cursor-pointer
                  transition-all duration-300
                  ${isDragging 
                    ? 'border-primary-accent bg-primary-accent/5 scale-[0.98]' 
                    : 'border-secondary-accent hover:border-primary-accent hover:bg-secondary-accent/20'
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-secondary-accent flex items-center justify-center"
                    animate={{
                      scale: isDragging ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedFile ? (
                      <FileCode className="w-8 h-8 text-heading-text" />
                    ) : (
                      <Upload className="w-8 h-8 text-body-text" />
                    )}
                  </motion.div>
                  
                  <div>
                    <p className="text-heading-text mb-1">
                      {selectedFile ? selectedFile.name : 'Drop your file here or click to browse'}
                    </p>
                    <p className="text-subtext text-sm">
                      All file types supported: Code, PDF, Word, Text, etc.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="text" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-subtext text-sm mb-3">
                  <FileText className="w-4 h-4" />
                  <span>Paste your code or text below for instant analysis</span>
                </div>
                <Textarea
                  placeholder="Paste your code here...

Example:
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[300px] font-mono text-sm bg-background border-secondary-accent focus-visible:border-primary-accent resize-none"
                />
                <p className="text-subtext text-xs">
                  {textInput.length} characters • {textInput.split('\n').length} lines
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {canGenerate && (
            <motion.button
              onClick={handleGenerateReview}
              disabled={isLoading}
              className="w-full mt-6 px-6 py-3 bg-primary-accent text-heading-text rounded-lg hover:bg-[#B6A88F] transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing {inputMode === "file" ? "File" : "Code"}...
                </span>
              ) : (
                'Generate Review'
              )}
            </motion.button>
          )}
        </motion.div>

        <motion.p
          className="text-center text-subtext text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Your code is analyzed locally and securely. We never store your files.
        </motion.p>
      </motion.main>
    </div>
  );
}
