# Storage Abstraction Layer

This directory contains the storage abstraction layer for file uploads.

## Overview

The storage module provides a simple interface for saving and retrieving files. It currently uses local disk storage but is designed to be easily swapped for cloud storage (S3, Azure Blob, etc.) later.

## Functions

### `saveFile(buffer: Buffer, originalName: string)`

Saves a file to storage and returns metadata.

**Parameters:**
- `buffer` - The file data as a Buffer
- `originalName` - Original filename (used to extract extension)

**Returns:**
```typescript
{
  id: string,           // Unique identifier (UUID)
  uri: string,          // Storage URI (e.g., "local://storage/raw/uuid.ext")
  path: string          // Full filesystem path
}
```

**Example:**
```typescript
import { saveFile } from './lib/storage';

const fileBuffer = Buffer.from(fileData);
const result = await saveFile(fileBuffer, 'document.pdf');
console.log(result.id);   // "bb7d8375-137e-4307-8a29-12c736bd97df"
console.log(result.uri);  // "local://storage/raw/bb7d8375-137e-4307-8a29-12c736bd97df.pdf"
```

### `getFilePath(id: string, ext?: string)`

Retrieves the filesystem path for a stored file.

**Parameters:**
- `id` - File identifier (UUID)
- `ext` - File extension (default: ".dat")

**Returns:** Full filesystem path as a string

**Example:**
```typescript
import { getFilePath } from './lib/storage';

const path = await getFilePath('bb7d8375-137e-4307-8a29-12c736bd97df', '.pdf');
// Returns: "/path/to/server/storage/raw/bb7d8375-137e-4307-8a29-12c736bd97df.pdf"
```

## Storage Location

Files are stored in: `server/storage/raw/`

This directory is automatically created and is excluded from git via `.gitignore`.

## Future: Cloud Storage Migration

To migrate to S3 or another provider, update the implementations in `storage.ts`:

```typescript
// Example S3 implementation
export async function saveFile(buffer: Buffer, originalName: string) {
  const id = uuidv4();
  const ext = path.extname(originalName) || ".dat";
  const key = `raw/${id}${ext}`;
  
  await s3Client.putObject({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: buffer,
  });
  
  return { id, uri: `s3://${process.env.S3_BUCKET}/${key}`, path: key };
}
```

The interface remains the same - only the implementation changes.
