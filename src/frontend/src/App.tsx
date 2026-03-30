import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogIn, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AdminPanel from "./components/AdminPanel";
import AnnouncementsSection from "./components/AnnouncementsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import OwnerSection from "./components/OwnerSection";
import RulesSection from "./components/RulesSection";
import ServerInfoCard from "./components/ServerInfoCard";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useIsCallerAdmin } from "./hooks/useQueries";

const queryClient = new QueryClient();

// Fallback styles for browsers without OKLCH support (older Android)
const pageFallbackStyle = {
  backgroundColor: "#120808",
  minHeight: "100vh",
  color: "#ede8e8",
};

const toastStyle = {
  background: "#2e1a1a",
  border: "1px solid rgba(220,20,20,0.5)",
  color: "#ede8e8",
};

function AdminDirectPage() {
  const { data: isAdmin } = useIsCallerAdmin();
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const loginRecorded = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || !identity || loginRecorded.current) return;
    loginRecorded.current = true;
    (actor as any).recordLogin().catch(() => {});
  }, [actor, isFetching, identity]);

  return (
    <div
      className="min-h-screen bg-background stone-bg flex flex-col"
      style={pageFallbackStyle}
    >
      <div className="fixed inset-0 scanline pointer-events-none z-50" />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center mb-8">
          <Shield size={48} className="mx-auto mb-4 text-accent" />
          <h1 className="font-pixel text-2xl text-accent text-glow-purple mb-2">
            ADMIN PANEL
          </h1>
          <p className="text-muted-foreground text-sm">
            EVILSMP Server Control Center
          </p>
        </div>
        {!identity ? (
          <div className="text-center">
            <p className="text-foreground/70 mb-6 text-sm">
              Login with Internet Identity to access admin controls
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="bg-accent/20 border border-accent/60 text-accent hover:bg-accent/30 font-pixel text-xs glow-purple px-8 py-6"
            >
              <LogIn size={16} className="mr-2" />
              {isLoggingIn ? "LOGGING IN..." : "LOGIN TO ADMIN"}
            </Button>
          </div>
        ) : isAdmin ? (
          <AdminPanel autoOpen />
        ) : (
          <div className="text-center">
            <p className="text-red-400 font-pixel text-sm">ACCESS DENIED</p>
            <p className="text-muted-foreground text-xs mt-2">
              You are not authorized as admin.
            </p>
          </div>
        )}
      </main>
      <Footer />
      <Toaster theme="dark" toastOptions={{ style: toastStyle }} />
    </div>
  );
}

function AppContent() {
  const { data: isAdmin } = useIsCallerAdmin();
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  const visitRecorded = useRef(false);
  const loginRecorded = useRef(false);
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!actor || isFetching || visitRecorded.current) return;
    visitRecorded.current = true;
    (actor as any).recordVisit().catch(() => {});
  }, [actor, isFetching]);

  useEffect(() => {
    if (!actor || isFetching || !identity || loginRecorded.current) return;
    loginRecorded.current = true;
    (actor as any).recordLogin().catch(() => {});
  }, [actor, isFetching, identity]);

  if (hash === "#admin") {
    return <AdminDirectPage />;
  }

  return (
    <div
      className="min-h-screen bg-background stone-bg"
      style={pageFallbackStyle}
    >
      <div className="fixed inset-0 scanline pointer-events-none z-50" />
      <Navbar />
      <main>
        <HeroSection />
        <ServerInfoCard />
        <RulesSection />
        <AnnouncementsSection />
        <OwnerSection />
        {isAdmin && <AdminPanel />}
      </main>
      <Footer />
      <Toaster theme="dark" toastOptions={{ style: toastStyle }} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
