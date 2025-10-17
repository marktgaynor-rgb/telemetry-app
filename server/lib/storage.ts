import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const STORAGE_DIR = path.resolve("server/storage/raw");

export async function saveFile(buffer: Buffer, originalName: string) {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
  const id = uuidv4();
  const ext = path.extname(originalName) || ".dat";
  const filePath = path.join(STORAGE_DIR, `${id}${ext}`);
  await fs.writeFile(filePath, buffer);
  return { id, uri: `local://storage/raw/${id}${ext}`, path: filePath };
}

export async function getFilePath(id: string, ext = ".dat") {
  return path.join(STORAGE_DIR, `${id}${ext}`);
}
