import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      message: "Telemetry App API is running",
      timestamp: new Date().toISOString()
    });
  });

  // 👇 Add this block
  app.get("/api/sessions", (_req, res) => {
    res.json(demoSessions);
  });
  
  const httpServer = createServer(app);

  return httpServer;
}
