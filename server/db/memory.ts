// server/db/memory.ts
export type Source = 'iracing' | 'aim';

export type SessionRow = {
  id: string;
  source: Source;
  track?: string;
  vehicle?: string;
  createdAt: string;
  parsed: boolean;
  fileUri: string;   // local://storage/raw/....
  filePath: string;  // server/storage/raw/....
};

export const db = {
  sessions: [] as SessionRow[],
};
