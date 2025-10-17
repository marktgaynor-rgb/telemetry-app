# Telemetry App

## Overview
A telemetry data management web application for racing simulators. Handles file uploads from iRacing and AiM sources, stores them locally with an abstraction layer for future cloud migration, and manages session metadata including track, vehicle, and parsing status.

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Query** for data fetching
- **Wouter** for routing

### Backend
- **Express.js** server
- **TypeScript** for type safety
- **In-memory database** for session management
- **Multer** for multipart file uploads
- **UUID** for unique identifiers

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and configurations
│   └── App.tsx         # Main app component
server/
├── db/
│   └── memory.ts       # In-memory session database
├── lib/
│   └── storage.ts      # File storage abstraction
├── routes.upload.ts    # File upload endpoints
├── routes.ts           # Main API routes registration
└── index.ts            # Server entry point
shared/
└── schema.ts           # Shared TypeScript types
```

## Current Features
- ✅ File upload endpoint with multipart/form-data support
- ✅ Support for iRacing and AiM telemetry sources
- ✅ Session metadata tracking (track, vehicle, timestamps)
- ✅ Local file storage with cloud-ready abstraction
- ✅ In-memory session database
- ✅ Health check API endpoint (`/api/health`)
- ✅ Dark/Light theme toggle
- ✅ Responsive design

## Design System
- **Primary Font**: Inter (400, 500, 600, 700 weights)
- **Monospace Font**: JetBrains Mono (400, 500, 600 weights)
- **Color Scheme**: Professional blue primary with semantic colors
- **Dark Mode**: Enabled by default, toggle available in header
- **Theme System**: Uses ThemeProvider context with localStorage persistence
  - Light/dark classes applied to document root
  - All components use CSS variables for theme-aware styling
  - Theme toggle available in header (Moon/Sun icon)

## Development

The application runs on port 5000 with both frontend and backend on the same server.

### Available API Routes
- `GET /api/health` - API health check
- `GET /api/sessions` - List all uploaded sessions
- `POST /api/upload` - Upload telemetry file (multipart/form-data)
  - Fields: `source` (iracing|aim), `track` (optional), `vehicle` (optional), `file` (binary)

## Storage System
- **Local File Storage**: Simple abstraction layer in `server/lib/storage.ts`
- **Functions**:
  - `saveFile(buffer, originalName)` - Save files with UUID-based naming, returns `{id, uri, path}`
  - `getFilePath(id, ext)` - Retrieve file paths by ID
- **Storage Location**: `server/storage/raw/` (gitignored)
- **Easy Migration**: Designed for simple swap to S3/cloud storage later
- **Documentation**: See `server/lib/README.md` for details

## Session Database
- **In-memory Storage**: `server/db/memory.ts`
- **Session Schema**:
  - `id` - Unique session identifier (UUID)
  - `source` - Data source: 'iracing' | 'aim'
  - `track` - Track name (optional)
  - `vehicle` - Vehicle name (optional)
  - `createdAt` - ISO timestamp
  - `parsed` - Boolean flag for processing status
  - `fileUri` - Storage URI (e.g., `local://storage/raw/...`)
  - `filePath` - Absolute filesystem path

## Recent Changes
- October 17, 2025: Implemented file upload system
  - Created upload router with multer integration (`server/routes.upload.ts`)
  - Implemented in-memory session database (`server/db/memory.ts`)
  - Added session list endpoint (`GET /api/sessions`)
  - Added file upload endpoint (`POST /api/upload`)
  - Installed multer and @types/multer packages
  - File type validation for .csv, .ibt, .txt files
  - 100 MB file size limit
  - Tested end-to-end: file upload → storage → database tracking
- October 17, 2025: Added file storage abstraction layer
  - Created storage module with saveFile and getFilePath functions
  - Added uuid package for unique file identifiers
  - Created documentation and examples
- October 16, 2025: Initial project setup with blank template
  - Created basic welcome page with theme support
  - Added health check API endpoint

## Next Steps
- Build frontend upload UI component
- Implement telemetry file parsers (iRacing .ibt, AiM .csv)
- Create session list/detail pages
- Add data visualization for telemetry data
- Implement search and filtering for sessions
