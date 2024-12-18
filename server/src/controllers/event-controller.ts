import { Request, Response } from 'express';
import EventService from '../service/eventService.js';
import { Event } from '../models/event.js';

interface EventQueryParams {
  postalCode: string;
  classificationName?: string;
  size?: number;
}

// GET /api/events?postalCode=ZIPCODE (server side)
export const getEventsByZipcode = async (req: Request, res: Response) => {
  // Cast req.query to the expected type
  const { postalCode, classificationName = 'Music', size = 10 } = req.query as unknown as EventQueryParams;

  console.log(`GET /api/events hit with query: ${JSON.stringify(req.query)}`);

  try {
    const events = await EventService.fetchEventsByZipcode(postalCode, classificationName, size);
    res.json(events);
  } catch (error: any) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ message: 'Failed to fetch events from Ticketmaster' });
  }
};

// GET /api/events/:id (server side)
export const getEventDetailsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(`GET /api/events/${id} hit with params: ${JSON.stringify(req.params)}`);

  try {
    const eventDetails = await EventService.fetchEventDetailsById(id);
    res.json(eventDetails);
  } catch (error: any) {
    console.error('Error fetching event details:', error.message);
    res.status(500).json({ message: 'Failed to fetch event details from Ticketmaster' });
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
    console.error('Error adding event to favorites:', error.message);
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
    console.error('Error removing event from favorites:', error.message);
    return res.status(500).json({ message: error.message });
  }
};