# EmailAgent Testing Guide

## Complete Testing Instructions

Follow these steps to test all features of the EmailAgent Chrome extension:

## Prerequisites Setup

### 1. API Keys Configuration
First, you need to configure your API keys in `backend/.env`:

```bash
# Get OpenAI API Key from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-actual-openai-key-here

# Get Gmail OAuth credentials from Google Cloud Console
GMAIL_CLIENT_ID=your-client-id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-client-secret
GMAIL_REDIRECT_URI=http://localhost:3001/oauth2callback

PORT=3001
```

### 2. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3001/oauth2callback`
7. Add authorized JavaScript origins: `http://localhost:3001`
8. Copy the Client ID and Client Secret to your `.env` file

## Installation & Setup

### 1. Start the Backend Server
```bash
# Make sure you're in the project root
cd MyEMailAgent

# Start the backend server (should already be running)
npm run dev:backend
```
You should see: `EmailAgent backend running on port 3001`

### 2. Build and Load the Extension
```bash
# Build the extension
npm run build:extension

# The built files will be in extension/dist/
```

### 3. Load Extension in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Navigate to your project folder and select `extension/dist`
5. The EmailAgent extension should appear in your extensions list

## Testing Each Feature

### 1. Basic Extension Loading
**Test**: Extension appears in Gmail
1. Open Gmail in Chrome (`https://mail.google.com`)
2. **Expected**: You should see the EmailAgent sidebar appear on the right side
3. **Expected**: The sidebar shows "EmailAgent" header with four sections:
   - Email Categories
   - Draft Suggestions  
   - Reminders List
   - Voice Interface

### 2. Email Categories Feature
**Test**: AI-powered email categorization
1. In Gmail, make sure you have some emails in your inbox
2. In the EmailAgent sidebar, look for the "Email Categories" section
3. **Expected**: Categories like "Job Opportunities", "Personal", "Promotions" should be displayed
4. **Note**: This feature requires OpenAI API key to be configured

**API Test**:
```bash
# Test the categorization endpoint directly
curl -X POST http://localhost:3001/ai/categorize \
  -H "Content-Type: application/json" \
  -d '{"emails": ["Test email about job interview", "Newsletter from store"]}'
```

### 3. Draft Suggestions Feature
**Test**: AI-generated email replies
1. Select an email in Gmail
2. In the EmailAgent sidebar, look for "Draft Suggestions" section
3. **Expected**: You should see buttons for different tones:
   - Formal
   - Casual  
   - Quick
4. Click on any tone button
5. **Expected**: A draft reply should be generated and displayed

**API Test**:
```bash
# Test draft generation endpoint
curl -X POST http://localhost:3001/ai/draft \
  -H "Content-Type: application/json" \
  -d '{"email": "Thanks for your email about the meeting", "tone": "Formal"}'
```

### 4. Reminders & To-Dos Feature
**Test**: Extract tasks from emails
1. Make sure you have emails with dates, deadlines, or action items
2. In the EmailAgent sidebar, check the "Reminders List" section
3. **Expected**: Important tasks and deadlines should be extracted and displayed
4. **Expected**: Each reminder should show:
   - Task description
   - Due date
   - Priority level
   - Checkbox to mark complete

**API Test**:
```bash
# Test reminders extraction
curl -X POST http://localhost:3001/ai/reminders \
  -H "Content-Type: application/json" \
  -d '{"emails": ["Please submit the report by Friday", "Meeting scheduled for tomorrow at 2 PM"]}'
```

### 5. Voice Interface Feature
**Test**: Voice commands and interaction
1. In the EmailAgent sidebar, find the "Voice Commands" section
2. Click the "Start" button (should turn red and show "Stop")
3. **Expected**: Browser should request microphone permission
4. Grant microphone permission
5. **Expected**: Button should show "Listening..." status
6. Speak a command like:
   - "Summarize today's new emails"
   - "Draft a reply to John"
   - "Remind me about the Amazon refund email"
7. Click "Stop" to end recording
8. **Expected**: Transcript should appear below the button

**API Test**:
```bash
# Test voice command processing (requires audio file)
curl -X POST http://localhost:3001/voice/command \
  -H "Content-Type: multipart/form-data" \
  -F "audio=@test-audio.wav"
```

### 6. Gmail Integration Testing
**Test**: Reading Gmail data
1. Make sure you're logged into Gmail
2. The extension should authenticate with Gmail automatically
3. **Expected**: No authentication errors in browser console

**API Test**:
```bash
# Test Gmail threads endpoint (requires authentication)
curl -X GET http://localhost:3001/gmail/threads \
  -H "Authorization: Bearer your-gmail-token"
```

## Debugging & Troubleshooting

### 1. Check Browser Console
1. Right-click in Gmail → "Inspect" → "Console" tab
2. Look for any JavaScript errors
3. Common issues:
   - CORS errors (backend not running)
   - Authentication errors (OAuth not configured)
   - API errors (OpenAI key missing)

### 2. Check Extension Console
1. Go to `chrome://extensions/`
2. Find EmailAgent extension
3. Click "Inspect views: service worker"
4. Check for errors in the service worker console

### 3. Check Backend Logs
1. Look at the terminal where you ran `npm run dev:backend`
2. Check for any error messages or API failures
3. Common issues:
   - Port 3001 already in use
   - Missing environment variables
   - OpenAI API key invalid

### 4. Network Tab Testing
1. Open Gmail with DevTools → Network tab
2. Use the extension features
3. **Expected**: You should see API calls to `localhost:3001`
4. Check response status codes (should be 200 for success)

## Feature-Specific Testing

### Voice Commands Testing
Try these specific voice commands:
- "Summarize today's new emails"
- "Draft a reply to [sender name] confirming tomorrow's call"
- "Remind me about the [email subject] next week"
- "Read my latest emails aloud"
- "Show me job-related emails"

### Email Categorization Testing
Test with different email types:
- Job application emails
- Newsletter/promotional emails
- Personal emails from friends
- Meeting invitations
- Automated notifications

### Draft Generation Testing
Test different tones:
- **Formal**: Business emails, job applications
- **Casual**: Friends, informal colleagues  
- **Quick**: Short acknowledgments, confirmations

## Performance Testing

### 1. Load Testing
1. Open Gmail with many emails (100+)
2. Use EmailAgent features
3. **Expected**: Sidebar should load within 2-3 seconds
4. **Expected**: No browser freezing or crashes

### 2. Memory Usage
1. Open Chrome Task Manager (Shift+Esc)
2. Use EmailAgent for 10-15 minutes
3. **Expected**: Memory usage should remain stable
4. **Expected**: No significant memory leaks

## Success Criteria

✅ **Extension loads successfully in Gmail**
✅ **All four main sections are visible and functional**
✅ **Backend server responds to API calls**
✅ **Voice interface can record and process audio**
✅ **No console errors during normal usage**
✅ **Gmail authentication works properly**
✅ **OpenAI integration generates meaningful responses**

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Extension not visible in Gmail | Check if extension is loaded and enabled in chrome://extensions/ |
| "OpenAI API key not configured" error | Add valid OpenAI API key to backend/.env |
| CORS errors | Ensure backend server is running on port 3001 |
| Voice not working | Grant microphone permissions to Chrome |
| Gmail authentication fails | Check OAuth credentials in Google Cloud Console |
| Backend won't start | Check if port 3001 is available, install dependencies |

## Advanced Testing

### 1. Test with Multiple Gmail Accounts
1. Switch between different Gmail accounts
2. **Expected**: Extension should work with each account
3. **Expected**: Authentication should be handled per account

### 2. Test Extension Updates
1. Make changes to extension code
2. Run `npm run build:extension`
3. Click "Reload" button in chrome://extensions/
4. **Expected**: Changes should be reflected immediately

### 3. Test Error Handling
1. Stop the backend server
2. Try using extension features
3. **Expected**: Graceful error messages, no crashes
4. Restart backend server
5. **Expected**: Extension should reconnect automatically

This comprehensive testing guide covers all aspects of the EmailAgent extension. Follow these steps to ensure all features are working correctly!
