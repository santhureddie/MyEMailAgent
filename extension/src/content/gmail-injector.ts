// Content Script: Injects EmailAgent sidebar into Gmail
const SIDEBAR_ID = 'emailagent-sidebar-root';

function injectSidebar() {
  if (document.getElementById(SIDEBAR_ID)) return;
  const sidebar = document.createElement('div');
  sidebar.id = SIDEBAR_ID;
  sidebar.style.position = 'fixed';
  sidebar.style.top = '0';
  sidebar.style.right = '0';
  sidebar.style.width = '350px';
  sidebar.style.height = '100vh';
  sidebar.style.zIndex = '9999';
  sidebar.style.background = '#fff';
  sidebar.style.boxShadow = '-2px 0 8px rgba(0,0,0,0.08)';
  document.body.appendChild(sidebar);
  // React sidebar will be mounted by sidebar.js as a content script
}

function observeGmailNavigation() {
  const observer = new MutationObserver(() => {
    injectSidebar();
    // ...handle Gmail navigation changes...
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

window.addEventListener('DOMContentLoaded', () => {
  injectSidebar();
  observeGmailNavigation();
});

// Message relay between sidebar and service worker
// ...message passing logic...
