import OpenAI from 'openai';
import type { DraftSuggestion, EmailCategory, Reminder, VoiceCommand } from '../types/api';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function categorizeEmails(emails: string[]): Promise<EmailCategory[]> {
  // Example: Use chat.completions.create for categorization
  const prompt = `Categorize these emails: ${JSON.stringify(emails)}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  });
  // Parse response. TODO: Implement real parsing.
  return [];
}

export async function generateDraft(email: string, tone: string): Promise<DraftSuggestion> {
  const prompt = `Write a ${tone} reply to: ${email}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  });
  // Parse response. TODO: Implement real parsing.
  return { tone, text: '' };
}

export async function extractReminders(emails: string[]): Promise<Reminder[]> {
  const prompt = `Extract reminders from these emails: ${JSON.stringify(emails)}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  });
  // Parse response. TODO: Implement real parsing.
  return [];
}

export async function processVoiceCommand(audio: any): Promise<VoiceCommand> {
  // TODO: Implement voice command processing with OpenAI
  return { transcript: '', intent: '', entities: {} };
}

export function processVoiceStream(ws: any, req: any) {
  ws.on('message', (msg: any) => {
    // TODO: Implement streaming to OpenAI and send transcript
  });
}
