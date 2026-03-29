import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { toast } from "sonner";

const SERVER_IP = "EVILSMPPLAY.aternos.me";

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 10) % 100}%`,
  top: `${(i * 23 + 5) % 80}%`,
  delay: `${i * 0.4}s`,
  duration: `${3 + (i % 3)}s`,
}));

export default function HeroSection() {
  const copyIP = async () => {
    await navigator.clipboard.writeText(SERVER_IP);
    toast.success("Server IP copied! Join the chaos.");
  };

  const scrollToRules = () => {
    document.getElementById("rules")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Banner image as background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/evilsmp-banner.dim_1200x400.png')",
          filter: "brightness(0.35) saturate(1.2)",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-40"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animation: `float ${p.duration} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-pixel text-accent text-xs sm:text-sm mb-4 tracking-widest text-glow-purple animate-flicker">
            ☠ WELCOME TO ☠
          </p>
          <h1 className="font-pixel text-primary text-glow-green text-3xl sm:text-5xl md:text-6xl mb-4 leading-tight tracking-wide">
            EVILSMP
          </h1>
          <p className="font-pixel text-muted-foreground text-xs sm:text-sm mb-10 tracking-widest">
            Enter if you dare...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={copyIP}
            className="bg-primary text-primary-foreground hover:bg-primary/80 font-pixel text-xs glow-green border-0 px-8 py-6"
            data-ocid="hero.primary_button"
          >
            ⚔ JOIN NOW
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToRules}
            className="border-accent/60 text-accent hover:bg-accent/10 font-pixel text-xs glow-purple px-8 py-6"
            data-ocid="hero.secondary_button"
          >
            📜 VIEW RULES
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 font-pixel text-muted-foreground text-xs tracking-widest"
        >
          <span className="inline-block animate-pulse">
            ▼ SCROLL TO ENTER ▼
          </span>
        </motion.div>
      </div>
    </section>
  );
}
