import { motion } from "motion/react";
import { ArrowRight, Brain, FileText, Zap } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-32 pb-16 px-4 text-center"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-purple-200/50 dark:border-purple-800/50 mb-6"
      >
        <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        <span className="text-sm font-medium text-purple-900 dark:text-purple-200">Powered by Advanced AI</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight"
      >
        AI-Powered{" "}
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Diagnostic Report
        </span>{" "}
        Generator
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
      >
        Transform inspection and thermal data into actionable insights instantly.
        Save hours of manual work with intelligent analysis.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Button
          size="lg"
          onClick={() => {
            const uploadSection = document.getElementById('upload-section');
            uploadSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl shadow-purple-500/30 group"
        >
          Get Started
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>

      {/* Feature Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-8 mt-16"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50">
            <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <span>AI Analysis</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/50">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <span>Smart Reports</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 dark:bg-pink-950/50">
            <Zap className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <span>Instant Results</span>
        </div>
      </motion.div>
    </motion.section>
  );
}