import { Router } from 'express';
import multer from 'multer';
import { processVoiceStream, processVoiceCommand } from '../services/openai-service';

const router = Router();
const upload = multer();

router.ws('/stream', processVoiceStream);

router.post('/command', upload.single('audio'), async (req, res) => {
  try {
    const command = await processVoiceCommand(req.file);
    res.json(command);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
