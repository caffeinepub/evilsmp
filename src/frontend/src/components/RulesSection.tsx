import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { useGetAllRules } from "../hooks/useQueries";

const DEFAULT_RULES = [
  "Respect all players — harassment, racism, or toxic behavior = immediate ban",
  "No griefing in protected zones — violators will be struck by lightning (banned)",
  "No hacking, cheating, or exploit abuse — first offense = temp ban, repeat = permanent",
  "Listen to staff — their word is law on this server",
  "No spamming or advertising other servers in chat",
  "PvP is allowed in open world only — no killing players at spawn",
  "Keep builds appropriate — no offensive structures",
  "Have fun and contribute to the community or face the void",
];

export default function RulesSection() {
  const { data: rules, isLoading } = useGetAllRules();
  const displayRules =
    rules && rules.length > 0 ? rules.map((r) => r.content) : DEFAULT_RULES;

  return (
    <section id="rules" className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-primary text-glow-green text-xl sm:text-2xl text-center mb-2">
            ⚔ THE LAW ⚔
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10">
            Break these rules, face the consequences.
          </p>

          {isLoading ? (
            <div
              className="text-center text-muted-foreground font-pixel text-xs"
              data-ocid="rules.loading_state"
            >
              Loading laws...
            </div>
          ) : (
            <div className="space-y-3">
              {displayRules.map((rule, index) => (
                <motion.div
                  key={rule}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  data-ocid={`rules.item.${index + 1}`}
                >
                  <Card className="bg-card border border-glow-green hover:border-primary/80 transition-all group">
                    <CardContent className="p-4 flex items-start gap-4">
                      <span className="font-pixel text-primary text-glow-green text-lg shrink-0 w-8 text-center">
                        {index + 1}
                      </span>
                      <p className="text-foreground text-sm leading-relaxed">
                        {rule}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
