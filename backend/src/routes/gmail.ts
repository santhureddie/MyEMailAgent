import { Router } from 'express';
import { validateToken } from '../middleware/auth';
import { fetchThreads, readMessage, createDraft } from '../services/gmail-service';

const router = Router();

router.get('/threads', validateToken, async (req, res) => {
  try {
    const threads = await fetchThreads(req.user);
    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/messages/:id', validateToken, async (req, res) => {
  try {
    const message = await readMessage(req.params.id, req.user);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/drafts', validateToken, async (req, res) => {
  try {
    const draft = await createDraft(req.body, req.user);
    res.json(draft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
