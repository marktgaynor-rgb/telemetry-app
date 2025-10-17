# Telemetry App

## Overview
A blank Node.js fullstack application with a clean, professional foundation. Built with Express backend and React frontend, ready for custom feature implementation.

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
- **In-memory storage** (MemStorage) ready for database integration

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and configurations
│   └── App.tsx         # Main app component
server/
├── routes.ts           # API endpoints
├── storage.ts          # Data storage interface
└── index.ts            # Server entry point
shared/
└── schema.ts           # Shared TypeScript types
```

## Current Features
- ✅ Clean landing page with welcome message
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Professional UI components
- ✅ Health check API endpoint (`/api/health`)

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

### Available Routes
- `/` - Home page
- `/api/health` - API health check

## Storage System
- **Local File Storage**: Simple abstraction layer in `server/lib/storage.ts`
- **Functions**:
  - `saveFile(buffer, originalName)` - Save files with UUID-based naming
  - `getFilePath(id, ext)` - Retrieve file paths by ID
- **Storage Location**: `server/storage/raw/` (gitignored)
- **Easy Migration**: Designed for simple swap to S3/cloud storage later
- **Documentation**: See `server/lib/README.md` for details

## Recent Changes
- October 17, 2025: Added file storage abstraction layer
  - Created storage module with saveFile and getFilePath functions
  - Added uuid package for unique file identifiers
  - Created documentation and examples
- October 16, 2025: Initial project setup with blank template
  - Created basic welcome page with theme support
  - Added health check API endpoint

## Next Steps
This is a blank template ready for your custom features:
- Add your data models in `shared/schema.ts`
- Implement API endpoints in `server/routes.ts`
- Build UI components in `client/src/components/`
- Create new pages in `client/src/pages/`
