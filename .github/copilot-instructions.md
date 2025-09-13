# Copilot Instructions for EmailAgent

## Big Picture Architecture
- **Monorepo**: Three main workspaces—`extension/` (Chrome extension), `backend/` (Node.js Express API proxy), and `shared/` (TypeScript types/utilities).
- **Extension**: Manifest v3 Chrome extension with React sidebar UI, service worker for OAuth/token management, and content script for Gmail DOM injection.
- **Backend**: Express server proxies Gmail and OpenAI API requests, manages credentials, and enforces security/rate limits.
- **Shared**: Common TypeScript types for data structures and API responses.

## Data Flow & Integration
- **Gmail OAuth**: Service worker uses `chrome.identity.launchWebAuthFlow` for authentication; tokens stored in `chrome.storage`.
- **Email Categorization/Drafting**: Extension requests backend to fetch/categorize emails and generate drafts via OpenAI.
- **Voice Interaction**: Sidebar streams audio to backend, which relays to OpenAI for transcription and intent extraction.
- **Reminders**: Extracted from emails, managed via extension UI and Chrome alarms API.
- **Message Passing**: Use `src/shared/messages.ts` for communication between service worker, content script, and React app.

## Developer Workflows
- **Install**: `npm install` at root (uses workspaces)
- **Build Extension**: `npm run build:extension` (Vite multi-entry)
- **Dev Servers**: `npm run dev:extension` (extension), `npm run dev:backend` (backend)
- **Chrome Load**: Load unpacked from `extension/dist` after build
- **Environment**: Configure API keys in `backend/.env` (see `.env.example`)

## Project-Specific Patterns
- **TypeScript Strictness**: All code uses strict typing; shared types in `shared/types/common.ts` and `extension/src/shared/types.ts`.
- **React UI**: Sidebar UI in `extension/src/sidebar/`, components in `components/`, entry in `index.tsx`.
- **Service Worker**: Handles OAuth, alarms, and message routing in `extension/src/background/service-worker.ts`.
- **Content Script**: Injects sidebar and observes Gmail DOM in `extension/src/content/gmail-injector.ts`.
- **API Services**: Extension-side API calls in `services/` (gmail-service, ai-service, voice-service).
- **Backend Routing**: API endpoints in `backend/src/routes/` (gmail, ai, voice).
- **Credential Management**: Never hardcode secrets; use environment variables and secure storage.

## External Dependencies
- **Gmail API**: Requires OAuth credentials and token management.
- **OpenAI API**: Used for categorization, drafting, reminders, and voice.
- **Tailwind CSS**: Used for sidebar UI styling.
- **Vite**: Multi-entry build for extension parts.

## Examples
- **Message Passing**: See `extension/src/shared/messages.ts` for usage patterns.
- **API Proxying**: See `backend/src/routes/ai.ts` and `backend/src/services/openai-service.ts` for OpenAI integration.
- **Sidebar UI**: See `extension/src/sidebar/components/` for React component structure.

---

For more details, see `README.md`, `docs/SETUP.md`, and `docs/ARCHITECTURE.md`.

> If any section is unclear or missing, please provide feedback for iterative improvement.
