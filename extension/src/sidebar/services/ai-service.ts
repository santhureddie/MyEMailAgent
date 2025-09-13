import type { DraftSuggestion, EmailCategory, Reminder } from '../../shared/types';

const API_BASE = 'http://localhost:3001/ai';

export async function categorizeEmails(emails: string[]): Promise<EmailCategory[]> {
  const res = await fetch(`${API_BASE}/categorize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emails })
  });
  if (!res.ok) throw new Error('Failed to categorize emails');
  return res.json();
}

export async function generateDraft(email: string, tone: string): Promise<DraftSuggestion> {
  const res = await fetch(`${API_BASE}/draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, tone })
  });
  if (!res.ok) throw new Error('Failed to generate draft');
  return res.json();
}

export async function extractReminders(emails: string[]): Promise<Reminder[]> {
  const res = await fetch(`${API_BASE}/reminders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emails })
  });
  if (!res.ok) throw new Error('Failed to extract reminders');
  return res.json();
}

// ...other AI API functions...
