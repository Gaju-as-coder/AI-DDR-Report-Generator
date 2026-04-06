import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Sparkles } from "lucide-react";
import { FileUpload } from "./file-upload";
import { ProgressIndicator } from "./progress-indicator";
import { ResultsCard } from "./results-card";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Step = "upload" | "processing" | "complete";

interface Report {
  summary: string;
  observations: string[];
  root_cause: string;
  severity: "High" | "Medium" | "Low";
  recommendations: string;
  missing_info: string;
  pdf?: string;
  word?: string;
}

export function UploadCard() {
  const [inspectionFile, setInspectionFile] = useState<File | null>(null);
  const [thermalFile, setThermalFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<Report | null>(null);

  const canGenerate = inspectionFile && thermalFile && currentStep === "upload";

  // const handleGenerate = async () => {
  //   if (!canGenerate) return;

  //   setIsGenerating(true);
  //   setCurrentStep("processing");

  //   // Simulate AI processing
  //   //await new Promise((resolve) => setTimeout(resolve, 3000));

  //   // Generate mock report
  //   // const mockReports = [
  //   //   {
  //   //     summary:
  //   //       "Analysis indicates significant thermal anomalies in Zone 3, with temperature differentials exceeding safety thresholds by 15%. Immediate maintenance recommended for cooling system integrity. Secondary concerns identified in electrical distribution panel showing irregular heat signatures.",
  //   //     severity: "High" as const,
  //   //   },
  //   //   {
  //   //     summary:
  //   //       "Inspection reveals moderate wear patterns on structural components. Thermal imaging shows normal temperature ranges across all monitored zones. Preventive maintenance suggested within next quarter to maintain optimal performance levels.",
  //   //     severity: "Medium" as const,
  //   //   },
  //   //   {
  //   //     summary:
  //   //       "All systems operating within acceptable parameters. Minor surface-level anomalies detected but pose no immediate risk. Equipment shows good thermal distribution with no critical concerns. Next scheduled inspection in 6 months.",
  //   //     severity: "Low" as const,
  //   //   },
  //   // ];

  //   const randomReport = mockReports[Math.floor(Math.random() * mockReports.length)];
  //   setReport(randomReport);
  //   setCurrentStep("complete");
  //   setIsGenerating(false);

  //   toast.success("Report generated successfully!");
  // };
const API_URL = "https://ai-ddr-report-generator-05t8.onrender.com";

  const handleGenerate = async () => {
  if (!canGenerate) return;

  try {
    setIsGenerating(true);
    setCurrentStep("processing");

    const formData = new FormData();
    formData.append("inspection", inspectionFile!);
    formData.append("thermal", thermalFile!);

    const response = await fetch(`${API_URL}/generate-report`, {
      method: "POST",
      body: formData,
      
    });

    if (!response.ok) {
      throw new Error("Server error");
    }


    const data = await response.json();

    if (!data.data) {
      throw new Error("Invalid response");
    }

    // Set report from backend
    setReport({
      summary: data.data.summary,
      observations: data.data.observations,
      root_cause: data.data.root_cause,
      severity: data.data.severity,
      recommendations: data.data.recommendations,
      missing_info: data.data.missing_info,
      pdf: data.pdf_file,
      word: data.word_file,
    });

    setCurrentStep("complete");
    toast.success("Report generated successfully!");

  } catch (error) {
    console.error(error);
    toast.error("Failed to generate report");
    setCurrentStep("upload");
  } finally {
    setIsGenerating(false);
  }
};

  // const handleDownloadPDF = () => {
  //   toast.success("PDF download started");
  //   // Mock download logic
  //   //console.log("Downloading PDF...");
  // };

//   const handleDownloadPDF = () => {
//   if (!report?.pdf) return;
//   window.open(`${API_URL}/${report.pdf}`, "_blank");
// };

  const handleDownloadPDF = () => {
  if (!report?.pdf) return;
  window.open(report.pdf, "_blank");
};



  // const handleDownloadWord = () => {
  //   toast.success("Word document download started");
  //   // Mock download logic
  //   console.log("Downloading Word...");
  // };
//   const handleDownloadWord = () => {
//   if (!report?.word) return;
//   window.open(`${API_URL}/${report.word}`, "_blank");
// };

   const handleDownloadWord = () => {
  if (!report?.word) return;
  window.open(report.word, "_blank");
};
  

  const handleReset = () => {
    setInspectionFile(null);
    setThermalFile(null);
    setCurrentStep("upload");
    setReport(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16" id="upload-section">
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 opacity-50" />

        <div className="relative p-8 md:p-12">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={currentStep} />

          {/* Upload Section */}
          {currentStep === "upload" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">Upload Your Reports</h2>
                <p className="text-muted-foreground">
                  Upload both inspection and thermal reports to begin analysis
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FileUpload
                  label="Inspection Report"
                  description="Drop your inspection report here"
                  file={inspectionFile}
                  onFileSelect={setInspectionFile}
                  icon="inspection"
                />
                <FileUpload
                  label="Thermal Report"
                  description="Drop your thermal report here"
                  file={thermalFile}
                  onFileSelect={setThermalFile}
                  icon="thermal"
                />
              </div>

              {/* Generate Button */}
              <div className="pt-6">
                <Button
                  size="lg"
                  disabled={!canGenerate || isGenerating}
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Processing State */}
          {currentStep === "processing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Analyzing Your Reports</h3>
              <p className="text-muted-foreground">
                Our AI is processing your data to generate comprehensive insights...
              </p>
            </motion.div>
          )}

          {/* Results Section */}
          {currentStep === "complete" && report && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <ResultsCard
                // summary={report.summary}
                // severity={report.severity}
                // onDownloadPDF={handleDownloadPDF}
                // onDownloadWord={handleDownloadWord}

                  summary={report.summary}
                  severity={report.severity}
                 // rootCause={report.root_cause}
                 // recommendations={report.recommendations}
                  onDownloadPDF={handleDownloadPDF}
                  onDownloadWord={handleDownloadWord}
              />

              {/* Generate Another Report */}
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                Generate Another Report
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}