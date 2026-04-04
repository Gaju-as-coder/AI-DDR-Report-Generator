import { motion } from "motion/react";
import { Check, FileUp, Cpu, FileCheck } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: "upload" | "processing" | "complete";
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { id: "upload", label: "Upload", icon: FileUp },
    { id: "processing", label: "Processing", icon: Cpu },
    { id: "complete", label: "Report Ready", icon: FileCheck },
  ];

  const stepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {steps.map((step, index) => {
        const isActive = index === stepIndex;
        const isCompleted = index < stepIndex;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex items-center gap-4">
            {/* Step Circle */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "rgb(59, 130, 246)"
                    : isActive
                    ? "rgb(147, 51, 234)"
                    : "rgb(243, 244, 246)",
                }}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                  isCompleted
                    ? "bg-blue-600"
                    : isActive
                    ? "bg-purple-600"
                    : "bg-gray-100"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <Icon
                    className={`w-6 h-6 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  />
                )}
              </motion.div>
              <span
                className={`text-sm font-medium ${
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="relative w-16 h-0.5 bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isCompleted ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 h-full bg-blue-600"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
