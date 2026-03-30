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
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-center mb-2"
            style={{ color: "#f2f2f2" }}
          >
            📢{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f03070, #e03060)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ANNOUNCEMENTS
            </span>
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#8a8080" }}>
            Stay updated with the latest from EVILSMP.
          </p>

          {isLoading ? (
            <div
              className="text-center text-sm"
              style={{ color: "#8a8080" }}
              data-ocid="announcements.loading_state"
            >
              Loading...
            </div>
          ) : !announcements || announcements.length === 0 ? (
            <div
              className="text-center py-12"
              data-ocid="announcements.empty_state"
            >
              <p className="text-sm" style={{ color: "#8a8080" }}>
                No announcements yet.
                <br />
                Stay tuned...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((ann, index) => (
                <div
                  key={ann.title + ann.timestamp.toString()}
                  data-ocid={`announcements.item.${index + 1}`}
                >
                  <div
                    className="rounded-sm"
                    style={{
                      backgroundColor: "#150909",
                      border: "1px solid rgba(220,60,80,0.3)",
                    }}
                  >
                    <div className="p-4 pb-2 flex items-start justify-between gap-4">
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#dc3c50" }}
                      >
                        {ann.title}
                      </p>
                      <span
                        className="text-xs shrink-0"
                        style={{ color: "#8a8080" }}
                      >
                        {formatDate(ann.timestamp)}
                      </span>
                    </div>
                    <div className="px-4 pb-4">
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#f2f2f2" }}
                      >
                        {ann.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
