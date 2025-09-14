# EmailAgent Setup Instructions

## Quick Start Guide

EmailAgent is an intelligent Gmail assistant Chrome extension with voice interaction capabilities. Follow these steps to get it running:

### Prerequisites
- Node.js >= 18.x
- Chrome browser (latest version)
- Gmail account
- OpenAI API key
- Google Cloud Console project with Gmail API enabled

### 1. Installation

```bash
# Clone and install dependencies
git clone https://github.com/santhureddie/MyEMailAgent.git
cd MyEMailAgent
npm install
```

### 2. API Configuration

#### OpenAI API Key
1. Visit https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (starts with `sk-`)

#### Gmail OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3001/oauth2callback`
7. Copy Client ID and Client Secret

#### Environment Configuration
1. Navigate to `backend/` folder
2. Copy `.env.example` to `.env`
3. Replace placeholder values:

```env
# Replace with your actual OpenAI API key
OPENAI_API_KEY=sk-your-actual-openai-key-here

# Replace with your Gmail OAuth credentials
GMAIL_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-actual-client-secret
GMAIL_REDIRECT_URI=http://localhost:3001/oauth2callback

PORT=3001
```

### 3. Build and Run

```bash
# Build the extension
npm run build:extension

# Start the backend server
npm run dev:backend
```

### 4. Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `extension/dist` folder from your project
5. The EmailAgent extension should now appear in your extensions list

### 5. Test the Extension

1. Open Gmail in Chrome (`https://mail.google.com`)
2. You should see the EmailAgent sidebar appear
3. The extension will prompt for Gmail authentication on first use
4. Test the voice interface by clicking the microphone button

## Features Overview

### Core MVP Features ✅
- **Email Categorization**: AI-powered email sorting by intent
- **Smart Draft Suggestions**: Generate formal, casual, or quick replies
- **Reminders & To-Dos**: Extract important tasks from emails
- **Voice Interface**: Hands-free email management with OpenAI Realtime API
- **Gmail Integration**: Seamless sidebar within Gmail interface

### Voice Commands
- "Summarize today's new emails"
- "Draft a reply to [sender] confirming [topic]"
- "Remind me about [email topic] next week"
- "Read my latest emails aloud"

## Architecture

- **Frontend**: React-based Chrome extension with Tailwind CSS
- **Backend**: Node.js/Express API server for secure credential management
- **APIs**: Gmail API, OpenAI GPT models, OpenAI Realtime API
- **Authentication**: OAuth 2.0 for Gmail, secure token storage

## Troubleshooting

### Common Issues

1. **Extension not loading**
   - Ensure you built the extension: `npm run build:extension`
   - Check that you selected the `extension/dist` folder, not `extension/`

2. **Backend connection errors**
   - Verify backend is running: `npm run dev:backend`
   - Check that port 3001 is not in use by another application

3. **Gmail authentication fails**
   - Verify OAuth credentials in `.env` file
   - Ensure redirect URI matches exactly: `http://localhost:3001/oauth2callback`
   - Check that Gmail API is enabled in Google Cloud Console

4. **OpenAI API errors**
   - Verify API key is correct and has sufficient credits
   - Check API key permissions and rate limits

5. **Voice features not working**
   - Ensure microphone permissions are granted to Chrome
   - Check browser console for WebRTC errors

### Development Mode
