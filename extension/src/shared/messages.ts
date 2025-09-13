// Message passing utilities for EmailAgent extension
import type { Message } from './types';

export function sendMessage(msg: Message): Promise<any> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(msg, resolve);
  });
}

export function onMessage(
  handler: (msg: Message, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => void
) {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    handler(msg, sender, sendResponse);
    return true;
  });
}

// Message types: AUTH_REQUEST, EMAIL_FETCH, AI_PROCESS, VOICE_COMMAND, etc.
