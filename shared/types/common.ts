// Common shared types for EmailAgent
export interface EmailMessage {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  snippet: string;
  body: string;
  labels: string[];
}

export interface Category {
  name: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  messages: EmailMessage[];
}

export interface DraftSuggestion {
  tone: 'Formal' | 'Casual' | 'Quick';
  text: string;
}

export interface Reminder {
  id: string;
  text: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  completed: boolean;
}

export interface VoiceCommand {
  transcript: string;
  intent: string;
  entities: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
