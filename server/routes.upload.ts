// server/routes.upload.ts
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { saveFile } from './lib/storage';
import { db, SessionRow } from './db/memory';

const router = Router();

// Store file in memory first; we'll write it with saveFile()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB cap for MVP
  fileFilter: (_req, file, cb) => {
    // Allow a few common types (expand later)
    const ok = ['.csv', '.ibt', '.txt'].includes(path.extname(file.originalname).toLowerCase());
    if (!ok) return cb(new Error('Unsupported file type for MVP (use .csv or .ibt)'));
    cb(null, true);
  },
});

// POST /api/upload  (multipart/form-data)
// fields: source ("iracing" | "aim"), track (string), vehicle (string), file (binary)
router.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    // Basic validation
    const source = (req.body?.source || '').toLowerCase();
    if (source !== 'iracing' && source !== 'aim') {
      return res.status(400).json({ error: 'source must be "iracing" or "aim"' });
    }
    if (!req.file?.buffer || !req.file?.originalname) {
      return res.status(400).json({ error: 'missing file' });
    }

    // Write file to local storage
    const { uri, path: filePath } = await saveFile(req.file.buffer, req.file.originalname);

    // Create a new session row
    const row: SessionRow = {
      id: uuidv4(),
      source,
      track: req.body?.track || undefined,
      vehicle: req.body?.vehicle || undefined,
      createdAt: new Date().toISOString(),
      parsed: false,           // parser will flip this later
      fileUri: uri,
      filePath,
    };

    db.sessions.unshift(row);  // newest first

    return res.status(201).json({
      sessionId: row.id,
      message: 'Upload received',
    });
  } catch (err: any) {
    return res.status(400).json({ error: err?.message || 'upload failed' });
  }
});

export default router;
