import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "./ui/button";

interface FileUploadProps {
  label: string;
  description: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  icon?: "inspection" | "thermal";
}

export function FileUpload({ label, description, file, onFileSelect, icon = "inspection" }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  const gradientFrom = icon === "inspection" ? "from-blue-500" : "from-orange-500";
  const gradientTo = icon === "inspection" ? "to-blue-600" : "to-orange-600";
  const bgColor = icon === "inspection" ? "bg-blue-50" : "bg-orange-50";
  const bgColorDark = icon === "inspection" ? "dark:bg-blue-950/30" : "dark:bg-orange-950/30";
  const borderColor = icon === "inspection" ? "border-blue-200" : "border-orange-200";
  const borderColorDark = icon === "inspection" ? "dark:border-blue-800/50" : "dark:border-orange-800/50";
  const textColor = icon === "inspection" ? "text-blue-600" : "text-orange-600";
  const textColorDark = icon === "inspection" ? "dark:text-blue-400" : "dark:text-orange-400";

  return (
    <div className="relative">
      {!file ? (
        <div {...getRootProps()}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all ${
              isDragActive
                ? `${borderColor} ${borderColorDark} ${bgColor} ${bgColorDark}`
                : "border-border hover:border-muted-foreground bg-background"
            }`}
          >
            <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div
              className={`flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
            >
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="font-semibold mb-1">{label}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="text-xs text-muted-foreground">
              Supports: PDF, DOC, DOCX, TXT
            </div>
          </div>
        </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative border-2 rounded-2xl p-6 ${borderColor} ${borderColorDark} ${bgColor} ${bgColorDark}`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
            >
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold ${textColor} ${textColorDark} truncate`}>{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFileSelect(null)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}