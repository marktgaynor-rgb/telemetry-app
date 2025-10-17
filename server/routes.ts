// server/routes.ts
import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import { fileURLToPath } from "url";

import uploadRouter from "./routes.upload";      // ← the upload route from A1.2
import { db } from "./db/memory";                // ← in-memory “DB” of sessions

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      message: "Telemetry App API is running",
      timestamp: new Date().toISOString(),
    });
  });

  // Upload endpoints (/api/upload)
  app.use(uploadRouter);

  // A1.3: List sessions
  app.get("/api/sessions", (_req, res) => {
    const list = db.sessions.map((s) => ({
      id: s.id,
      source: s.source,
      track: s.track,
      vehicle: s.vehicle,
      createdAt: s.createdAt,
      parsed: s.parsed,
    }));
    res.json(list);
  });

  // Serve the built React app for non-API routes
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const clientPath = path.resolve(__dirname, "../client/dist");

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
