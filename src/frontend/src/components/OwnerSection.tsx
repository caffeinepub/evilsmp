import { Crown } from "lucide-react";
import { motion } from "motion/react";
import { useGetOwnerProfile } from "../hooks/useQueries";

export default function OwnerSection() {
  const { data: ownerProfile } = useGetOwnerProfile();

  const name = ownerProfile?.name || "Anik";
  const contact = ownerProfile?.contact || "";

  return (
    <section id="owner" className="py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-xl sm:text-2xl font-bold text-center mb-10"
            style={{ color: "#f2f2f2" }}
          >
            👑{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f03070, #e03060)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SERVER OWNER
            </span>
          </h2>

          <div
            className="rounded-sm relative overflow-hidden"
            style={{
              backgroundColor: "#150909",
              border: "1px solid rgba(220,60,80,0.4)",
              boxShadow: "0 0 20px rgba(220,60,80,0.1)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(220,60,80,0.05) 0%, transparent 60%)",
              }}
            />

            <div className="p-8 flex flex-col sm:flex-row items-center gap-6 relative">
              {/* Avatar */}
              <div className="shrink-0">
                <div
                  className="w-24 h-24 rounded-sm flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(220,60,80,0.3), rgba(240,48,112,0.2))",
                    border: "1px solid rgba(220,60,80,0.5)",
                    boxShadow: "0 0 16px rgba(220,60,80,0.3)",
                  }}
                >
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "#dc3c50" }}
                  >
                    A
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Crown size={20} style={{ color: "#facc15" }} />
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: "#f2f2f2" }}
                  >
                    {name}
                  </h3>
                </div>
                <span
                  className="inline-flex items-center px-3 py-0.5 rounded text-xs font-bold mb-3"
                  style={{
                    backgroundColor: "rgba(220,60,80,0.2)",
                    border: "1px solid rgba(220,60,80,0.5)",
                    color: "#dc3c50",
                  }}
                >
                  ★ OWNER
                </span>
                <p className="text-sm" style={{ color: "#8a8080" }}>
                  Founder and supreme ruler of EVILSMP. What Anik says, goes.
                </p>
                {contact && (
                  <p className="text-xs mt-2" style={{ color: "#8a8080" }}>
                    {contact}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
