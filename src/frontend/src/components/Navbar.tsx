import { Button } from "@/components/ui/button";
import { Menu, Sword, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-pixel text-primary text-glow-green text-xs sm:text-sm tracking-wider"
          data-ocid="nav.link"
        >
          ☠ EVILSMP
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={() => scrollTo("server-info")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid="server_info.link"
          >
            Server
          </button>
          <button
            type="button"
            onClick={() => scrollTo("rules")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid="rules.link"
          >
            Rules
          </button>
          <button
            type="button"
            onClick={() => scrollTo("announcements")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid="announcements.link"
          >
            Announcements
          </button>
          <button
            type="button"
            onClick={() => scrollTo("owner")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid="owner.link"
          >
            Owner
          </button>

          {isLoggedIn ? (
            <Button
              size="sm"
              variant="outline"
              onClick={clear}
              className="border-primary/40 text-primary hover:bg-primary/10 text-xs"
              data-ocid="auth.button"
            >
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="bg-primary/20 border border-primary/60 text-primary hover:bg-primary/30 text-xs font-pixel"
              data-ocid="auth.button"
            >
              {isLoggingIn ? "..." : "Login"}
            </Button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          data-ocid="nav.toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 px-4 py-4 flex flex-col gap-3">
          {["server-info", "rules", "announcements", "owner"].map((id) => (
            <button
              type="button"
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-sm text-muted-foreground hover:text-primary capitalize py-1"
            >
              <Sword size={12} className="inline mr-2" />
              {id.replace("-", " ")}
            </button>
          ))}
          {isLoggedIn ? (
            <Button
              size="sm"
              variant="outline"
              onClick={clear}
              className="w-full border-primary/40 text-primary text-xs"
            >
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-primary/20 border border-primary/60 text-primary text-xs font-pixel"
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
