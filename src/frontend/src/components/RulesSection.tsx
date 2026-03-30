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
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-center mb-2"
            style={{ color: "#f2f2f2" }}
          >
            ⚔{" "}
            <span
              style={{
                background: "linear-gradient(to right, #f03070, #e03060)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              THE LAW
            </span>{" "}
            ⚔
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#8a8080" }}>
            Break these rules, face the consequences.
          </p>

          {isLoading ? (
            <div
              className="text-center text-sm"
              style={{ color: "#8a8080" }}
              data-ocid="rules.loading_state"
            >
              Loading laws...
            </div>
          ) : (
            <div className="space-y-3">
              {displayRules.map((rule, index) => (
                <div key={rule} data-ocid={`rules.item.${index + 1}`}>
                  <div
                    className="rounded-sm p-4 flex items-start gap-4 transition-all"
                    style={{
                      backgroundColor: "#150909",
                      border: "1px solid rgba(240,48,112,0.25)",
                    }}
                  >
                    <span
                      className="font-bold text-lg shrink-0 w-8 text-center"
                      style={{ color: "#f03070" }}
                    >
                      {index + 1}
                    </span>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#f2f2f2" }}
                    >
                      {rule}
                    </p>
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
