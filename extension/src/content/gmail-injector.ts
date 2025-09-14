// Content Script: Injects EmailAgent floating bubble into Gmail
const BUBBLE_ID = 'emailagent-bubble-root';

function injectFloatingBubble() {
  if (document.getElementById(BUBBLE_ID)) return;
  
  console.log('EmailAgent: Injecting floating bubble into Gmail');
  
  const bubble = document.createElement('div');
  bubble.id = BUBBLE_ID;
  bubble.style.position = 'fixed';
  bubble.style.bottom = '20px';
  bubble.style.right = '20px';
  bubble.style.width = '60px';
  bubble.style.height = '60px';
  bubble.style.borderRadius = '50%';
  bubble.style.background = 'linear-gradient(135deg, #4285F4, #34A853)';
  bubble.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  bubble.style.cursor = 'pointer';
  bubble.style.zIndex = '10000';
  bubble.style.display = 'flex';
  bubble.style.alignItems = 'center';
  bubble.style.justifyContent = 'center';
  bubble.style.transition = 'all 0.3s ease';
  
  // Add email icon
  bubble.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  `;
  
  // Hover effects
  bubble.addEventListener('mouseenter', () => {
    bubble.style.transform = 'scale(1.1)';
    bubble.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
  });
  
  bubble.addEventListener('mouseleave', () => {
    bubble.style.transform = 'scale(1)';
    bubble.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  });
  
  document.body.appendChild(bubble);
  
  console.log('EmailAgent: Floating bubble created and added to DOM');
}

function waitForGmail() {
  // Wait for Gmail to fully load
  const checkGmail = () => {
    if (window.location.hostname === 'mail.google.com' && document.body) {
      console.log('EmailAgent: Gmail detected, injecting floating bubble');
      injectFloatingBubble();
    } else {
      setTimeout(checkGmail, 1000);
    }
  };
  checkGmail();
}

function observeGmailNavigation() {
  const observer = new MutationObserver(() => {
    if (window.location.hostname === 'mail.google.com') {
      injectFloatingBubble();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForGmail);
} else {
  waitForGmail();
}

// Also try when page is fully loaded
window.addEventListener('load', () => {
  setTimeout(injectFloatingBubble, 1000);
});

console.log('EmailAgent: Content script loaded');
