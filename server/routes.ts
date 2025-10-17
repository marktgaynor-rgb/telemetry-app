// server/routes.ts
import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import uploadRouter from "./routes.upload";
import { db } from "./db/memory";

export async function registerRoutes(app: Express): Promise<Server> {
  // ✅ Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      message: "Telemetry App API is running",
      timestamp: new Date().toISOString(),
    });
  });

  // ✅ Upload routes
  app.use(uploadRouter);

  // ✅ Sessions list (A1.3)
  app.get("/api/sessions", (_req, res) => {
    const list =
      db.sessions?.map((s) => ({
        id: s.id,
        source: s.source,
        track: s.track,
        vehicle: s.vehicle,
        createdAt: s.createdAt,
        parsed: s.parsed,
      })) ?? [];
    res.json(list);
  });

  // ✅ Serve frontend from dist/public (this is your build output)
  const clientPath = path.resolve(process.cwd(), "dist/public");
  console.log("[frontend] serving from:", clientPath);

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
