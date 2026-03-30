import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="border-t py-8 px-4 mt-8"
      style={{ borderTopColor: "rgba(240,48,112,0.2)" }}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold" style={{ color: "#f03070" }}>
            ☠ EVILSMP ☠
          </p>
          <p className="text-xs text-center" style={{ color: "#8a8080" }}>
            © {year}. Built with{" "}
            <Heart
              size={12}
              className="inline mx-0.5"
              style={{ color: "#f03070" }}
            />{" "}
            using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "#f03070" }}
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs" style={{ color: "#8a8080" }}>
            v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
