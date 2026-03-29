import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { useGetAllAnnouncements } from "../hooks/useQueries";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AnnouncementsSection() {
  const { data: announcements, isLoading } = useGetAllAnnouncements();

  return (
    <section id="announcements" className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-primary text-glow-green text-xl sm:text-2xl text-center mb-2">
            📢 ANNOUNCEMENTS
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10">
            Stay updated with the latest from EVILSMP.
          </p>

          {isLoading ? (
            <div
              className="text-center text-muted-foreground font-pixel text-xs"
              data-ocid="announcements.loading_state"
            >
              Loading...
            </div>
          ) : !announcements || announcements.length === 0 ? (
            <div
              className="text-center py-12"
              data-ocid="announcements.empty_state"
            >
              <p className="font-pixel text-muted-foreground text-xs leading-relaxed">
                No announcements yet.
                <br />
                Stay tuned...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((ann, index) => (
                <motion.div
                  key={ann.title + ann.timestamp.toString()}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  data-ocid={`announcements.item.${index + 1}`}
                >
                  <Card className="bg-card border border-glow-purple">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-sm font-pixel text-accent text-glow-purple">
                          {ann.title}
                        </CardTitle>
                        <span className="text-muted-foreground text-xs shrink-0">
                          {formatDate(ann.timestamp)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-foreground text-sm leading-relaxed">
                        {ann.message}
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
