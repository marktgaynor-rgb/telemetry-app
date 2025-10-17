// Example: File upload endpoint using the storage abstraction
// This demonstrates how to integrate the storage layer into your API

import type { Express, Request, Response } from "express";
import { saveFile, getFilePath } from "./storage";

/**
 * Example endpoint implementation
 * Add this to your server/routes.ts file:
 * 
 * import { setupStorageExample } from "./lib/storage-example";
 * setupStorageExample(app);
 */
export function setupStorageExample(app: Express) {
  
  // Example 1: Save text data as a file
  app.post("/api/example/save-text", async (req: Request, res: Response) => {
    try {
      const { text, filename } = req.body;
      
      if (!text || !filename) {
        return res.status(400).json({ error: "Missing text or filename" });
      }
      
      const buffer = Buffer.from(text, 'utf-8');
      const result = await saveFile(buffer, filename);
      
      res.json({
        success: true,
        file: {
          id: result.id,
          uri: result.uri,
        }
      });
    } catch (error) {
      console.error("Error saving file:", error);
      res.status(500).json({ error: "Failed to save file" });
    }
  });
  
  // Example 2: Retrieve file metadata
  app.get("/api/example/file/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { ext = ".txt" } = req.query;
      
      const filePath = await getFilePath(id, ext as string);
      
      res.json({
        success: true,
        id,
        path: filePath,
      });
    } catch (error) {
      console.error("Error getting file path:", error);
      res.status(500).json({ error: "Failed to get file path" });
    }
  });
}

/**
 * Example usage with multipart/form-data (requires multer middleware)
 * 
 * import multer from 'multer';
 * const upload = multer({ storage: multer.memoryStorage() });
 * 
 * app.post("/api/upload", upload.single('file'), async (req, res) => {
 *   if (!req.file) {
 *     return res.status(400).json({ error: "No file uploaded" });
 *   }
 *   
 *   const result = await saveFile(req.file.buffer, req.file.originalname);
 *   res.json({ success: true, file: result });
 * });
 */
