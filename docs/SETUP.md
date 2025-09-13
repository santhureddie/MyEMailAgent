# EmailAgent Setup Guide

## Prerequisites
- Node.js >= 18.x
- Chrome browser (latest)
- Gmail account
- OpenAI API key
- Gmail OAuth client credentials

## Installation
1. Clone the repository
2. Run `npm install` in the root directory
3. Configure environment variables in `backend/.env` (see `.env.example`)
4. Start backend: `npm run dev:backend`
5. Start extension dev server: `npm run dev:extension`

## Chrome Extension Development
1. Build extension: `npm run build:extension`
2. Open Chrome Extensions page
3. Enable Developer Mode
4. Click "Load unpacked" and select `extension/dist`

## API Key Configuration
- Gmail OAuth: Create credentials in Google Cloud Console
- OpenAI: Get API key from OpenAI dashboard
- Add both to `backend/.env`

## First Run Verification
- Open Gmail in Chrome
- Ensure EmailAgent sidebar appears
- Test email categorization, draft suggestions, reminders, and voice features

## Troubleshooting
- Check Node.js and Chrome versions
- Verify API keys and OAuth setup
- See logs in backend and extension for errors
