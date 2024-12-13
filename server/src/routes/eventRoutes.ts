import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const TM_API_KEY = process.env.TICKETMASTER_API_KEY;

// GET /api/events?zipcode=12345
router.get('/', async (req, res) => {
  const { zipcode } = req.query;

  try {
    const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
      params: {
        apikey: TM_API_KEY,
        postalCode: zipcode,
        classificationName: 'music',
      },
    });

    const events = response.data._embedded?.events || [];
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events from Ticketmaster' });
  }
});

export default router;