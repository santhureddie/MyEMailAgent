// Service Worker: Handles Gmail OAuth, token management, alarms, and messaging
import type { AuthTokens, Message } from '../shared/types';
import { getTokens, setTokens } from '../shared/storage';
import { sendMessage, onMessage } from '../shared/messages';


// Backend-managed OAuth
const BACKEND_BASE = 'http://localhost:3001';

async function launchGmailOAuth(): Promise<AuthTokens | null> {
  try {
    // Step 1: Get consent URL from backend
    const res = await fetch(`${BACKEND_BASE}/auth/start`, { method: 'POST' });
    const { url } = await res.json();
    // Step 2: Launch Chrome OAuth flow to backend
    const redirect = await chrome.identity.launchWebAuthFlow({ url, interactive: true });
    // Step 3: Backend returns tokens in redirect URL (parse as needed)
    const params = new URLSearchParams(redirect.split('?')[1] || '');
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    if (!access_token) return null;
    const tokens: AuthTokens = { access_token, refresh_token: refresh_token || undefined };
    await setTokens(tokens);
    return tokens;
  } catch (e) {
    console.error('OAuth error', e);
    return null;
  }
}

chrome.alarms.onAlarm.addListener((alarm) => {
  // Handle reminder notifications
  // ...alarm logic...
});

onMessage(async (msg: Message, sender, sendResponse) => {
  if (msg.type === 'AUTH_REQUEST') {
    const tokens = await launchGmailOAuth();
    if (tokens) await setTokens(tokens);
    sendResponse({ type: 'AUTH_RESPONSE', tokens });
  }
  // ...other message handlers...
});

// Token refresh, storage, and error handling utilities
// ...additional logic...
