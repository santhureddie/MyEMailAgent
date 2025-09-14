import type { EmailMessage } from '../types/api';

export async function fetchThreads(user: any): Promise<EmailMessage[]> {
  // Use Gmail API to fetch threads
  // ...token validation, API call, pagination...
  return [];
}

export async function readMessage(id: string, user: any): Promise<EmailMessage> {
  // Use Gmail API to read message
  // ...token validation, API call...
  return { id, threadId: '', subject: '', from: '', to: '', date: '', snippet: '', body: '', labels: [] };
}

export async function createDraft(data: any, user: any): Promise<any> {
  // Use Gmail API to create draft
  // ...token validation, API call...
  return {};
}
