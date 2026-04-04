import { motion } from "motion/react";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ResultsCardProps {
  summary: string;
  severity: "High" | "Medium" | "Low";
  onDownloadPDF: () => void;
  onDownloadWord: () => void;
}

export function ResultsCard({ summary, severity, onDownloadPDF, onDownloadWord }: ResultsCardProps) {
  const severityColors = {
    High: "bg-red-100 text-red-700 border-red-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Low: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-8 shadow-lg"
    >
      {/* Success Icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
          <CheckCircle2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">Report Generated Successfully</h3>
          <p className="text-sm text-muted-foreground">Your diagnostic report is ready</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Summary</h4>
          <Badge
            variant="outline"
            className={`${severityColors[severity]} font-medium`}
          >
            {severity} Priority
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-4 rounded-lg">
          {summary}
        </p>
      </div>

      {/* Download Buttons */}
      <div className="space-y-3">
        <p className="text-sm font-medium mb-3">Download Report</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            onClick={onDownloadPDF}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download PDF
            <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
          </Button>
          <Button
            onClick={onDownloadWord}
            variant="outline"
            className="group hover:bg-accent"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download Word
            <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
