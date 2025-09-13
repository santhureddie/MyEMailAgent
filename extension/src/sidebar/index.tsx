import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const SIDEBAR_ID = 'emailagent-sidebar-root';

function renderSidebar() {
  const container = document.getElementById(SIDEBAR_ID);
  if (!container) return;
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

renderSidebar();

// Error boundary and hot reload logic can be added here
