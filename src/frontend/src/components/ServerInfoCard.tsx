import { Button } from "@/components/ui/button";
import { Copy, Server, Users, Wifi } from "lucide-react";
import { toast } from "sonner";
import { useGetPlayerCount } from "../hooks/useQueries";

const SERVER_IP = "EVILSMPPLAY.aternos.me";
const SERVER_PORT = "28694";

const cardStyle = {
  backgroundColor: "#150909",
  border: "1px solid rgba(240,48,112,0.3)",
};

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
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-center mb-2"
            style={{ color: "#f2f2f2" }}
          >
            SERVER{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f03070, #e03060)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              INFORMATION
            </span>
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#8a8080" }}>
            Everything you need to connect and play.
          </p>

          <div className="rounded-lg p-6 sm:p-8" style={cardStyle}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* IP */}
              <div className="space-y-2">
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#8a8080" }}
                >
                  Server IP
                </p>
                <div className="flex items-center gap-2">
                  <code
                    className="font-mono text-sm flex-1 px-3 py-2 rounded"
                    style={{
                      color: "#f03070",
                      backgroundColor: "rgba(240,48,112,0.08)",
                      border: "1px solid rgba(240,48,112,0.2)",
                    }}
                  >
                    {SERVER_IP}
                  </code>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copy(SERVER_IP, "Server IP")}
                    className="shrink-0 hover:bg-transparent"
                    style={{ color: "#f03070" }}
                    data-ocid="server_info.copy_ip.button"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>

              {/* Port */}
              <div className="space-y-2">
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#8a8080" }}
                >
                  Port
                </p>
                <div className="flex items-center gap-2">
                  <code
                    className="font-mono text-sm flex-1 px-3 py-2 rounded"
                    style={{
                      color: "#f03070",
                      backgroundColor: "rgba(240,48,112,0.08)",
                      border: "1px solid rgba(240,48,112,0.2)",
                    }}
                  >
                    {SERVER_PORT}
                  </code>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copy(SERVER_PORT, "Port")}
                    className="shrink-0 hover:bg-transparent"
                    style={{ color: "#f03070" }}
                    data-ocid="server_info.copy_port.button"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>

              {/* Version */}
              <div className="space-y-2">
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#8a8080" }}
                >
                  Version
                </p>
                <div className="flex items-center gap-2">
                  <Server size={16} style={{ color: "#dc3c50" }} />
                  <span className="text-sm" style={{ color: "#f2f2f2" }}>
                    Java Edition
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#8a8080" }}
                >
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <Wifi size={16} style={{ color: "#f03070" }} />
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: "rgba(240,48,112,0.15)",
                      border: "1px solid rgba(240,48,112,0.4)",
                      color: "#f03070",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Players */}
              <div className="space-y-2 sm:col-span-2">
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#8a8080" }}
                >
                  Players Online
                </p>
                <div className="flex items-center gap-3">
                  <Users size={16} style={{ color: "#dc3c50" }} />
                  <span
                    className="text-lg font-bold"
                    style={{ color: "#f03070" }}
                  >
                    {current}
                    <span style={{ color: "#8a8080" }}> / {max}</span>
                  </span>
                  <div
                    className="flex-1 rounded-full h-2 max-w-48"
                    style={{ backgroundColor: "rgba(240,48,112,0.15)" }}
                  >
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${max > 0 ? (current / max) * 100 : 0}%`,
                        background:
                          "linear-gradient(to right, #f03070, #e03060)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
