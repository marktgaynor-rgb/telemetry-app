import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [apiText, setApiText] = useState("Checking...");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setApiText(d.message))
      .catch(() => setApiText("Failed to reach API"));
  }, []);

  return (
    <>
      {/* Simple status bar */}
      <div
        style={{
          padding: "8px",
          background: "#111",
          color: "#0f0",
          fontFamily: "monospace",
        }}
      >
        Backend status: {apiText}
      </div>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-14 items-center justify-between px-6">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Telemetry App</span>
                  </div>
                  <ThemeToggle />
                </div>
              </header>

              <Router />
            </div>

            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
