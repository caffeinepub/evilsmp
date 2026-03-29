import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
          <h2 className="font-pixel text-primary text-glow-green text-xl sm:text-2xl text-center mb-10">
            👑 SERVER OWNER
          </h2>

          <Card className="bg-card border border-glow-purple relative overflow-hidden">
            {/* Purple glow background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

            <CardContent className="p-8 flex flex-col sm:flex-row items-center gap-6 relative">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-sm bg-gradient-to-br from-accent/30 to-primary/20 border border-glow-purple flex items-center justify-center glow-purple">
                  <span className="font-pixel text-3xl text-accent text-glow-purple">
                    A
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Crown size={20} className="text-yellow-400" />
                  <h3 className="font-pixel text-2xl text-foreground">
                    {name}
                  </h3>
                </div>
                <Badge className="bg-accent/30 text-accent border border-accent/60 font-pixel text-xs mb-3 glow-purple">
                  ★ OWNER
                </Badge>
                <p className="text-muted-foreground text-sm">
                  Founder and supreme ruler of EVILSMP. What Anik says, goes.
                </p>
                {contact && (
                  <p className="text-muted-foreground text-xs mt-2">
                    {contact}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
