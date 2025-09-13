# EmailAgent Architecture

## Overview
EmailAgent consists of a Chrome extension (Manifest v3, React UI, service worker, content script) and a Node.js backend for API proxying and secure credential management. It integrates with Gmail and OpenAI APIs for email categorization, drafting, reminders, and voice interaction.

## Components
- **Extension**: Manifest v3, React sidebar, service worker, content script
- **Backend**: Express server, Gmail/OpenAI API proxy, credential management
- **Shared**: Common types/utilities

## Data Flow
1. User opens Gmail
2. Content script injects sidebar
3. Service worker handles authentication
4. Backend proxies Gmail/OpenAI API requests
5. Extension displays categorized emails, drafts, reminders, voice interface

## Security
- OAuth tokens stored in chrome.storage
- Backend validates extension origin and tokens
- Rate limiting and error handling on backend

## Diagrams
See main README for sequence diagram.

## Extension Lifecycle
- Inject sidebar on Gmail load
- Authenticate via service worker
- Communicate with backend for API calls
- Use alarms API for reminders

## API Integration
- Gmail API: fetch emails, create drafts, send messages
- OpenAI API: categorize emails, generate drafts, process voice

## Token Management
- OAuth flow via service worker
- Token refresh and storage
- Secure backend credential handling
