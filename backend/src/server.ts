import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import gmailRoutes from './routes/gmail';
import aiRoutes from './routes/ai';
// voiceRoutes import moved below

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const expressApp = express();
const wsInstance = expressWs(expressApp);
const app = wsInstance.app;

import voiceRoutes from './routes/voice';
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (origin.startsWith('chrome-extension://')) return cb(null, true);
    if (origin.startsWith('http://localhost')) return cb(null, true);
    cb(new Error('Not allowed'), false);
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/gmail', gmailRoutes);
app.use('/ai', aiRoutes);
app.use('/voice', voiceRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, error: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`EmailAgent backend running on port ${PORT}`);
});
