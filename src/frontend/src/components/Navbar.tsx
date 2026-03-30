import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function NavLink({
  label,
  onClick,
  ocid,
}: {
  label: string;
  onClick: () => void;
  ocid: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm font-medium transition-colors"
      style={{ color: hovered ? "#f03070" : "#c9b8b8" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={ocid}
    >
      {label}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const navItems = [
    { label: "Home", id: "" },
    { label: "Info", id: "server-info" },
    { label: "Rules", id: "rules" },
    { label: "Announcements", id: "announcements" },
    { label: "Owner", id: "owner" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b"
      style={{
        backgroundColor: "rgba(13,5,5,0.92)",
        borderBottomColor: "rgba(240,48,112,0.2)",
      }}
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center shrink-0"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/gemini_generated_image_fqga7sfqga7sfqga-019d3aaf-75a9-733c-bfef-3f4519d9424e-1.png"
            alt="EVILSMP"
            className="h-9 w-auto"
            style={{ filter: "drop-shadow(0 0 6px rgba(240,48,112,0.5))" }}
          />
        </button>

        {/* Center: Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {navItems.map(({ label, id }) => (
            <NavLink
              key={label}
              label={label}
              onClick={() =>
                id
                  ? scrollTo(id)
                  : window.scrollTo({ top: 0, behavior: "smooth" })
              }
              ocid={`${id || "home"}.link`}
            />
          ))}
        </nav>

        {/* Right: Auth button */}
        <div className="hidden md:flex items-center">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={clear}
              className="px-4 py-1.5 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#5865f2" }}
              data-ocid="auth.button"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={login}
              disabled={isLoggingIn}
              className="px-4 py-1.5 rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#5865f2" }}
              data-ocid="auth.button"
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden"
          style={{ color: "#f03070" }}
          onClick={() => setOpen(!open)}
          data-ocid="nav.toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-3"
          style={{
            backgroundColor: "rgba(13,5,5,0.97)",
            borderTopColor: "rgba(240,48,112,0.2)",
          }}
        >
          {navItems.map(({ label, id }) => (
            <button
              key={label}
              type="button"
              onClick={() =>
                id
                  ? scrollTo(id)
                  : window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="text-left text-sm py-1"
              style={{ color: "#c9b8b8" }}
            >
              {label}
            </button>
          ))}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={clear}
              className="px-4 py-2 rounded-md text-sm font-semibold text-white w-full"
              style={{ backgroundColor: "#5865f2" }}
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={login}
              disabled={isLoggingIn}
              className="px-4 py-2 rounded-md text-sm font-semibold text-white w-full disabled:opacity-60"
              style={{ backgroundColor: "#5865f2" }}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
