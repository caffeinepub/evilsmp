import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminPanel from "./components/AdminPanel";
import AnnouncementsSection from "./components/AnnouncementsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import OwnerSection from "./components/OwnerSection";
import RulesSection from "./components/RulesSection";
import ServerInfoCard from "./components/ServerInfoCard";
import { useIsCallerAdmin } from "./hooks/useQueries";

const queryClient = new QueryClient();

function AppContent() {
  const { data: isAdmin } = useIsCallerAdmin();

  return (
    <div className="min-h-screen bg-background stone-bg">
      {/* Scanline overlay */}
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
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.13 0.008 260)",
            border: "1px solid oklch(0.87 0.29 142 / 0.5)",
            color: "oklch(0.92 0.008 140)",
          },
        }}
      />
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
