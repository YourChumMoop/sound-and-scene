console.log('****starting server/src/controllers/event-controllers.ts****')

import { Request, Response } from 'express';
import { Event } from '../models/event.js';
import EventService from '../service/eventService.js';


// GET /api/events?postalCode=ZIPCODE
export const getEventsByZipcode = async (req: Request, res: Response) => {
  console.log('Inside getEventsByZipcode controller');
  console.log(`Request query parameters: ${JSON.stringify(req.query)}`);

  const { postalCode } = req.query;

  if (!postalCode) {
    console.warn('Postal code is missing in the request');
    return res.status(400).json({ message: 'Postal code is required' });
  }

  try {
    const events = await EventService.fetchEventsByZipcode(postalCode as string);
    console.log('Events fetched successfully:', events);
    return res.json(events);
  } catch (error: any) {
    console.error('Error fetching events by zip code:', error.message);
    return res.status(500).json({ message: error.message });
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
    placeId,
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
      placeId,
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