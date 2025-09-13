import type { AuthTokens, GmailMessage } from '../../shared/types';

const API_BASE = 'http://localhost:3001/gmail';

export async function fetchThreads(tokens: AuthTokens): Promise<GmailMessage[]> {
  const res = await fetch(`${API_BASE}/threads`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch threads');
  return res.json();
}

export async function readMessage(id: string, tokens: AuthTokens): Promise<GmailMessage> {
  const res = await fetch(`${API_BASE}/messages/${id}`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch message');
  return res.json();
}

export async function createDraft(data: any, tokens: AuthTokens): Promise<any> {
  const res = await fetch(`${API_BASE}/drafts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access_token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create draft');
  return res.json();
}

// ...other Gmail API functions...
