# EmailAgent Chrome Extension

EmailAgent is a Chrome extension for Gmail that uses AI to categorize emails, generate draft responses, extract reminders, and enable voice interaction. It consists of a Manifest v3 Chrome extension (React UI, service worker, content script) and a Node.js backend for API proxying and secure credential management.

## Features
- AI-powered email categorization
- Draft suggestions (formal, casual, quick)
- Reminders and to-do extraction
- Voice command interface
- Secure OAuth authentication
- Chrome extension best practices

## Monorepo Structure
- `extension/` — Chrome extension (React, Manifest v3)
- `backend/` — Node.js Express API proxy
- `shared/` — Shared types/utilities
- `docs/` — Documentation

## Setup
See [docs/SETUP.md](docs/SETUP.md) for detailed instructions.

## Development
- `npm install` — Install all dependencies
- `npm run dev:extension` — Start extension dev server
- `npm run dev:backend` — Start backend dev server

## Chrome Extension Loading
1. Build extension: `npm run build:extension`
2. Go to Chrome Extensions > Load unpacked > Select `extension/dist`

## API Keys & Environment
- Gmail OAuth credentials required
- OpenAI API key required
- See `.env.example` in backend for details

## Architecture
See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system overview and diagrams.

## Troubleshooting
- Ensure Node.js and Chrome are up to date
- Check API keys and environment variables
- See docs for more help
