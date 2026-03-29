import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Server, Users, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useGetPlayerCount } from "../hooks/useQueries";

const SERVER_IP = "EVILSMPPLAY.aternos.me";
const SERVER_PORT = "28694";

export default function ServerInfoCard() {
  const { data: playerCount } = useGetPlayerCount();

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const current = playerCount ? Number(playerCount.current) : 0;
  const max = playerCount ? Number(playerCount.max) : 20;

  return (
    <section id="server-info" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-primary text-glow-green text-xl sm:text-2xl text-center mb-10">
            ⚡ SERVER INFO
          </h2>

          <Card className="bg-card border border-glow-green">
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* IP */}
                <div className="space-y-2">
                  <p className="font-pixel text-xs text-muted-foreground tracking-widest">
                    SERVER IP
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-primary font-mono text-sm flex-1 bg-muted/50 px-3 py-2 rounded border border-border">
                      {SERVER_IP}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copy(SERVER_IP, "Server IP")}
                      className="text-primary hover:bg-primary/10 shrink-0"
                      data-ocid="server_info.copy_ip.button"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>

                {/* Port */}
                <div className="space-y-2">
                  <p className="font-pixel text-xs text-muted-foreground tracking-widest">
                    PORT
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-primary font-mono text-sm flex-1 bg-muted/50 px-3 py-2 rounded border border-border">
                      {SERVER_PORT}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copy(SERVER_PORT, "Port")}
                      className="text-primary hover:bg-primary/10 shrink-0"
                      data-ocid="server_info.copy_port.button"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>

                {/* Version */}
                <div className="space-y-2">
                  <p className="font-pixel text-xs text-muted-foreground tracking-widest">
                    VERSION
                  </p>
                  <div className="flex items-center gap-2">
                    <Server size={16} className="text-accent" />
                    <span className="text-foreground text-sm">
                      Java Edition
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <p className="font-pixel text-xs text-muted-foreground tracking-widest">
                    STATUS
                  </p>
                  <div className="flex items-center gap-2">
                    <Wifi size={16} className="text-primary" />
                    <Badge className="bg-primary/20 text-primary border border-primary/60 glow-green-sm font-pixel text-xs">
                      ● ONLINE
                    </Badge>
                  </div>
                </div>

                {/* Players */}
                <div className="space-y-2 sm:col-span-2">
                  <p className="font-pixel text-xs text-muted-foreground tracking-widest">
                    PLAYERS ONLINE
                  </p>
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-accent" />
                    <span className="font-pixel text-lg text-primary text-glow-green">
                      {current}
                      <span className="text-muted-foreground"> / {max}</span>
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2 max-w-48">
                      <div
                        className="h-2 rounded-full bg-primary glow-green-sm transition-all"
                        style={{
                          width: `${max > 0 ? (current / max) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
