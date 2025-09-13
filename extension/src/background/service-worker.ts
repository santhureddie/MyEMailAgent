// Service Worker: Handles Gmail OAuth, token management, alarms, and messaging
import type { AuthTokens, Message } from '../shared/types';
import { getTokens, setTokens } from '../shared/storage';
import { sendMessage, onMessage } from '../shared/messages';


const GMAIL_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const CLIENT_ID = '<YOUR_GMAIL_CLIENT_ID>'; // TODO: Move to config/env
const REDIRECT_URI = chrome.identity.getRedirectURL('oauth2');
const SCOPES = 'https://www.googleapis.com/auth/gmail.modify';

function parseFragment(fragment: string): AuthTokens | null {
  const params = new URLSearchParams(fragment.replace(/^#/, ''));
  const access_token = params.get('access_token');
  const expires_in = params.get('expires_in');
  // Google OAuth implicit flow does not return refresh_token
  if (!access_token) return null;
  return {
    access_token,
    expires_in: expires_in ? parseInt(expires_in) : undefined
  };
}

async function launchGmailOAuth(): Promise<AuthTokens | null> {
  try {
    const url = `${GMAIL_OAUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=${encodeURIComponent(SCOPES)}`;
    const result = await chrome.identity.launchWebAuthFlow({ url, interactive: true });
    // result is a redirect URL with fragment
    const fragment = result.split('#')[1] || '';
    const tokens = parseFragment(fragment);
    if (tokens) await setTokens(tokens);
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
