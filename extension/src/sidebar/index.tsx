import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatBubble from './ChatBubble';
import './styles.css';

const BUBBLE_ID = 'emailagent-bubble-root';

function setupBubbleInteraction() {
  console.log('EmailAgent: Setting up bubble interaction');
  
  const bubble = document.getElementById(BUBBLE_ID);
  if (!bubble) {
    console.log('EmailAgent: Bubble not found, retrying...');
    setTimeout(setupBubbleInteraction, 500);
    return;
  }
  
  console.log('EmailAgent: Bubble found, setting up click handler');
  
  let chatWindow: HTMLDivElement | null = null;
  let isOpen = false;
  
  bubble.addEventListener('click', () => {
    if (isOpen) {
      // Close chat window
      if (chatWindow) {
        chatWindow.remove();
        chatWindow = null;
        isOpen = false;
      }
    } else {
      // Open chat window
      chatWindow = document.createElement('div');
      chatWindow.id = 'emailagent-chat-window';
      chatWindow.style.position = 'fixed';
      chatWindow.style.bottom = '90px';
      chatWindow.style.right = '20px';
      chatWindow.style.width = '350px';
      chatWindow.style.height = '500px';
      chatWindow.style.background = '#fff';
      chatWindow.style.borderRadius = '12px';
      chatWindow.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
      chatWindow.style.zIndex = '9999';
      chatWindow.style.border = '1px solid #e0e0e0';
      chatWindow.style.overflow = 'hidden';
      
      document.body.appendChild(chatWindow);
      
      // Mount React chat component
      try {
        const root = createRoot(chatWindow);
        root.render(
          <React.StrictMode>
            <ChatBubble />
          </React.StrictMode>
        );
        console.log('EmailAgent: Chat window mounted successfully');
        isOpen = true;
      } catch (error) {
        console.error('EmailAgent: Error mounting chat window:', error);
        chatWindow.innerHTML = '<div style="padding: 20px; color: red;">EmailAgent Error: Failed to load chat</div>';
      }
    }
  });
}

// Initialize bubble interaction
function initializeBubble() {
  console.log('EmailAgent: Bubble script loaded');
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupBubbleInteraction);
  } else {
    setupBubbleInteraction();
  }
  
  // Also try after a delay to handle timing issues
  setTimeout(setupBubbleInteraction, 1000);
  setTimeout(setupBubbleInteraction, 2000);
}

initializeBubble();
