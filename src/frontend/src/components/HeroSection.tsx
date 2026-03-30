import { useState } from "react";
import { toast } from "sonner";

const SERVER_IP = "EVILSMPPLAY.aternos.me";
const SERVER_PORT = "28694";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyIP = async () => {
    await navigator.clipboard.writeText(`${SERVER_IP}:${SERVER_PORT}`);
    setCopied(true);
    toast.success("Server IP copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToInfo = () => {
    document
      .getElementById("server-info")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14"
      style={{ backgroundColor: "#0d0505" }}
    >
      {/* Dragon bg image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/dragon-bg.dim_1920x1080.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,5,5,0.45) 0%, rgba(13,5,5,0.6) 50%, rgba(13,5,5,0.92) 100%)",
        }}
      />

      {/* Content — always visible, no opacity:0 initial state */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/uploads/gemini_generated_image_fqga7sfqga7sfqga-019d3aaf-75a9-733c-bfef-3f4519d9424e-1.png"
            alt="EVILSMP"
            className="max-w-[320px] sm:max-w-[420px] w-full h-auto"
            style={{ filter: "drop-shadow(0 0 24px rgba(240,48,112,0.5))" }}
            loading="eager"
          />
        </div>

        {/* Headline */}
        <h1 className="font-bold text-4xl sm:text-6xl text-white mb-4 tracking-tight">
          WELCOME TO{" "}
          <span
            style={{
              background: "linear-gradient(to right, #f03070, #e03060)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            EVILSMP
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg mb-8 max-w-lg mx-auto"
          style={{ color: "#c9b8b8" }}
        >
          Join the ultimate Minecraft survival experience. Battle dragons, build
          empires, and become a legend.
        </p>

        {/* Server IP card */}
        <div
          className="inline-flex flex-col items-center rounded-lg px-6 py-4 mb-8 w-full max-w-sm mx-auto"
          style={{
            backgroundColor: "rgba(21,9,9,0.85)",
            border: "1px solid rgba(240,48,112,0.35)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-widest mb-2 uppercase"
            style={{ color: "#8a8080" }}
          >
            Server IP
          </p>
          <div className="flex items-center gap-3">
            <code
              className="font-mono text-sm sm:text-base font-bold"
              style={{ color: "#f03070" }}
            >
              {SERVER_IP}:{SERVER_PORT}
            </code>
            <button
              type="button"
              onClick={copyIP}
              className="px-3 py-1 rounded text-xs font-semibold transition-all"
              style={{
                backgroundColor: copied
                  ? "rgba(240,48,112,0.3)"
                  : "rgba(240,48,112,0.15)",
                border: "1px solid rgba(240,48,112,0.5)",
                color: "#f03070",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={copyIP}
            className="px-8 py-3 rounded-md text-white font-bold text-base transition-opacity hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(to right, #f03070, #e03060)",
              boxShadow: "0 0 20px rgba(240,48,112,0.4)",
            }}
          >
            Get Started
          </button>
          <button
            type="button"
            onClick={scrollToInfo}
            className="px-8 py-3 rounded-md font-bold text-base transition-all hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "rgba(240,48,112,0.12)",
              border: "1px solid rgba(240,48,112,0.5)",
              color: "#f03070",
            }}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <span
          className="text-xs animate-pulse tracking-widest"
          style={{ color: "#8a8080" }}
        >
          ▼ SCROLL DOWN ▼
        </span>
      </div>
    </section>
  );
}
