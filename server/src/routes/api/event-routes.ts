import { Router } from 'express';
import { getTicketMasterEvents } from '../../service/apiService.js';

const router = Router();

// Route for TicketMaster events
router.get('/events', async (req, res) => {
  const { postalCode } = req.query;

  if (!postalCode) {
    return res.status(400).json({ error: 'postalCode is required' });
  }

  try {
    const events = await getTicketMasterEvents(postalCode as string);
    return res.json(events);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching TicketMaster events' });
  }
});

export default router;