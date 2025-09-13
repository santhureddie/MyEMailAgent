import type { VoiceCommand } from '../../shared/types';

const API_BASE = 'http://localhost:3001/voice';

export async function startVoiceStream(): Promise<WebSocket> {
  const proto = location.protocol === 'https:' ? 'wss' : 'ws';
  const wsUrl = `${proto}://localhost:3001/voice/stream`;
  const ws = new WebSocket(wsUrl);
  // ...handle WebSocket events...
  return ws;
}

export async function processVoiceCommand(audio: Blob): Promise<VoiceCommand> {
  const formData = new FormData();
  formData.append('audio', audio);
  const res = await fetch(`${API_BASE}/command`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Failed to process voice command');
  return res.json();
}

// ...other voice API functions...
