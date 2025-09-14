import { Router, Request } from 'express';
import multer from 'multer';
import { processVoiceStream, processVoiceCommand } from '../services/openai-service';

const router = Router();
const upload = multer();

// router.ws is not available on Router, must be called on app
// Export a function to register WS route on the app
export function registerVoiceRoutes(app: any) {
  if (typeof app.ws === 'function') {
    app.ws('/voice/stream', processVoiceStream);
  }
  app.use('/voice', router);
}

router.post('/command', upload.single('audio'), async (req: Request, res) => {
  try {
    // Multer adds file property to req
    // @ts-ignore
    const command = await processVoiceCommand(req.file);
    res.json(command);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

export default router;
