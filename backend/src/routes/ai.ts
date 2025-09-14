import { Router } from 'express';
import { categorizeEmails, generateDraft, extractReminders } from '../services/openai-service';

const router = Router();

router.post('/categorize', async (req, res) => {
  try {
    const categories = await categorizeEmails(req.body.emails);
    res.json(categories);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

router.post('/draft', async (req, res) => {
  try {
    const draft = await generateDraft(req.body.email, req.body.tone);
    res.json(draft);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

router.post('/reminders', async (req, res) => {
  try {
    const reminders = await extractReminders(req.body.emails);
    res.json(reminders);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: message });
  }
});

export default router;
