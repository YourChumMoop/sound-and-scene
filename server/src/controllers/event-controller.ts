import { Request, Response } from 'express';
import axios from 'axios';
import { Event } from '../models/event.js';
import EventService from '../service/eventService.js';

const TM_API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';
const TM_API_KEY = process.env.TM_API_KEY || '';

// GET /api/events?postalCode=ZIPCODE (server side proxy)
export const getEventsByZipcode = async (req: Request, res: Response) => {
  const { postalCode, classificationName = 'Music', size = 10 } = req.query;

  console.log(`GET /api/events hit with query: ${JSON.stringify(req.query)}`);

  try {
    const response = await axios.get(TM_API_BASE_URL, {
      params: {
        apikey: TM_API_KEY,
        postalCode,
        classificationName,
        size,
      },
    });

    console.log('Ticketmaster API response:', response.data);
    res.json(response.data._embedded?.events || []);
  } catch (error: any) {
    console.error('Error fetching events from Ticketmaster:', error.message);
    res.status(500).json({ message: 'Failed to fetch events from Ticketmaster' });
  }
};

// GET /api/events/:id
export const getEventDetailsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const eventDetails = await EventService.fetchEventDetailsById(id);
    res.json(eventDetails);
  } catch (error: any) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/events/favorites – Add event to favorites
export const addEventToFavorites = async (req: Request, res: Response) => {
  const {
    id,
    name,
    date,
    time,
    city,
    state,
    country,
    latitude,
    longitude,
    url,
    imageUrl,
  } = req.body;

  try {
    // Check if the event already exists in the database
    const existingEvent = await Event.findByPk(id);
    if (existingEvent) {
      return res.status(409).json({ message: 'Event is already in favorites.' });
    }

    const newEvent = await Event.create({
      id,
      name,
      date,
      time,
      city,
      state,
      country,
      latitude,
      longitude,
      url,
      imageUrl,
    });

    return res.status(201).json({ message: 'Event added to favorites.', event: newEvent });
  } catch (error: any) {
    console.error('Error adding event to favorites:', error);
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/events/favorites/:id – Remove event from favorites
export const removeEventFromFavorites = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found in favorites.' });
    }

    await event.destroy();
    return res.json({ message: 'Event removed from favorites.' });
  } catch (error: any) {
    console.error('Error removing event from favorites:', error);
    return res.status(500).json({ message: error.message });
  }
};