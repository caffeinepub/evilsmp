import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="border-t border-border py-8 px-4 mt-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-pixel text-xs text-primary text-glow-green">
            ☠ EVILSMP ☠
          </p>
          <p className="text-muted-foreground text-xs text-center">
            © {year}. Built with{" "}
            <Heart size={12} className="inline text-red-500 mx-0.5" /> using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="font-pixel text-xs text-muted-foreground">v1.0</p>
        </div>
      </div>
    </footer>
  );
}
