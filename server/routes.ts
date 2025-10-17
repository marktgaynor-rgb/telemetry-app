import type { Express } from "express";
import { createServer, type Server } from "http";
import uploadRouter from "./routes.upload";
import { db } from "./db/memory";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      message: "Telemetry App API is running",
      timestamp: new Date().toISOString()
    });
  });

  // Sessions list endpoint
  app.get("/api/sessions", (_req, res) => {
    res.json(db.sessions);
  });

  // Upload routes
  app.use(uploadRouter);
  
  const httpServer = createServer(app);

  return httpServer;
}
