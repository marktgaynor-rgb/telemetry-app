// server/routes.ts
import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import uploadRouter from "./routes.upload";
import { db } from "./db/memory";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      message: "Telemetry App API is running",
      timestamp: new Date().toISOString(),
    });
  });

  // Upload endpoints
  app.use(uploadRouter);

  // A1.3: Sessions list
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

  // 🔽 Auto-detect and serve the built frontend
  const candidates = [
    path.resolve(process.cwd(), "dist"),
    path.resolve(process.cwd(), "client/dist"),
  ];

  const clientPath =
    candidates.find((p) => fs.existsSync(path.join(p, "index.html"))) ??
    candidates[0];

  console.log("[frontend] serving from:", clientPath);

  app.use(express.static(clientPath));
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ error: "API route not found" });
    }
    const indexFile = path.join(clientPath, "index.html");
    if (!fs.existsSync(indexFile)) {
      console.error("[frontend] index.html missing at:", indexFile);
      return res
        .status(500)
        .json({ message: `index.html not found at ${indexFile}` });
    }
    res.sendFile(indexFile);
  });

  const httpServer = createServer(app);
  return httpServer;
}
