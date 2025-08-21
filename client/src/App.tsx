import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SOSModal from "@/components/sos-modal";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);

  const handleSOSClick = () => {
    setIsSOSModalOpen(true);
  };

  const handleCloseSOSModal = () => {
    setIsSOSModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSOSClick={handleSOSClick} />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={() => <Home onSOSClick={handleSOSClick} />} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <SOSModal isOpen={isSOSModalOpen} onClose={handleCloseSOSModal} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
