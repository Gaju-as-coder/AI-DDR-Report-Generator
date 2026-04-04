import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border/40 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Built with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span>• AI-Powered • Portfolio Project</span>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>View on GitHub</span>
        </a>
      </div>
    </footer>
  );
}
