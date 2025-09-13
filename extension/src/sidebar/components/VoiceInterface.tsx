import React, { useState, useRef } from 'react';
import { startVoiceStream } from '../services/voice-service';

const VoiceInterface: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ws = await startVoiceStream();
    wsRef.current = ws;
    ws.onmessage = (event) => {
      setTranscript(event.data);
    };
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (e) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(e.data);
      }
    };
    recorder.start(250); // send every 250ms
    setRecording(true);
  };

  const handleStop = () => {
    mediaRecorderRef.current?.stop();
    wsRef.current?.close();
    setRecording(false);
  };

  return (
    <section>
      <h2 className="text-md font-semibold mb-2">Voice Commands</h2>
      <div className="flex items-center gap-2">
        <button
          className={`px-4 py-2 rounded-full ${recording ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          onClick={recording ? handleStop : handleStart}
        >
          {recording ? 'Stop' : 'Start'}
        </button>
        <span className="text-xs text-gray-500">{recording ? 'Listening...' : 'Idle'}</span>
      </div>
      {transcript && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">Transcript: {transcript}</div>
      )}
    </section>
  );
};

export default VoiceInterface;
