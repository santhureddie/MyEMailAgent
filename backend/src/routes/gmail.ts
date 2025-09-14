import { Router, Request, Response } from 'express';
import { validateToken } from '../middleware/auth';
import { fetchThreads, readMessage, createDraft } from '../services/gmail-service';

const router = Router();

router.get('/threads', validateToken, async (req: Request, res: Response) => {
  try {
    const threads = await fetchThreads((req as any).user);
    res.json(threads);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

router.get('/messages/:id', validateToken, async (req: Request, res: Response) => {
  try {
    const message = await readMessage(req.params.id, (req as any).user);
    res.json(message);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

router.post('/drafts', validateToken, async (req: Request, res: Response) => {
  try {
    const draft = await createDraft(req.body, (req as any).user);
    res.json(draft);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

export default router;
