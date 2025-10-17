// server/routes.ts
import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import uploadRouter from "./routes.upload";
import { db } from "./db/memory";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      message: "Telemetry App API is running",
      timestamp: new Date().toISOString(),
    });
  });

  // Uploads
  app.use(uploadRouter);

  // Sessions list (A1.3 sneak peek – keep if you already added db)
  app.get("/api/sessions", (_req, res) => {
    const list = db.sessions?.map(s => ({
      id: s.id,
      source: s.source,
      track: s.track,
      vehicle: s.vehicle,
      createdAt: s.createdAt,
      parsed: s.parsed,
    })) ?? [];
    res.json(list);
  });

  // 🔽 Serve the built frontend from root /dist (monorepo output)
  const clientPath = path.resolve(process.cwd(), "dist");
  app.use(express.static(clientPath));
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ error: "API route not found" });
    }
    res.sendFile(path.join(clientPath, "index.html"));
  });

  const httpServer = createServer(app);
  return httpServer;
}
