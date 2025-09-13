// Chrome extension storage utilities
import type { AuthTokens, GmailMessage, Reminder } from './types';

export async function setTokens(tokens: AuthTokens) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ authTokens: tokens }, resolve);
  });
}

export async function getTokens(): Promise<AuthTokens | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['authTokens'], (result) => {
      resolve(result.authTokens || null);
    });
  });
}

export async function setCachedEmails(emails: GmailMessage[]) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ cachedEmails: emails }, resolve);
  });
}

export async function getCachedEmails(): Promise<GmailMessage[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['cachedEmails'], (result) => {
      resolve(result.cachedEmails || []);
    });
  });
}

export async function setReminders(reminders: Reminder[]) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ reminders }, resolve);
  });
}

export async function getReminders(): Promise<Reminder[]> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['reminders'], (result) => {
      resolve(result.reminders || []);
    });
  });
}

// ...other storage utilities...
