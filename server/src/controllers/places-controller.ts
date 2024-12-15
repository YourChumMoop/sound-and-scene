// import { Request, Response } from 'express';
// import { Place } from '../models/places.js';

// // GET /places
// export const getAllPlaces = async (_req: Request, res: Response) => {
//   try {
//     const places = await Place.findAll();
//     res.json(places);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET /places/:id
// export const getPlaceById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const place = await Place.findByPk(id);
//     if (place) {
//       res.json(place);
//     } else {
//       res.status(404).json({ message: 'Place not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // POST /places
// export const createPlace = async (req: Request, res: Response) => {
//   const {
//     name,
//     address,
//     latitude,
//     longitude,
//     city,
//     state,
//     country,
//     category,
//     eventId,
//   } = req.body;

//   try {
//     const newPlace = await Place.create({
//       name,
//       address,
//       latitude,
//       longitude,
//       city,
//       state,
//       country,
//       category: category || 'Unknown',
//       eventId,
//     });

//     res.status(201).json(newPlace);
//   } catch (error: any) {
//     console.error('Error creating place:', error);
//     res.status(400).json({ message: error.message });
//   }
// };

// // PUT /places/:id
// export const updatePlace = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name, address, latitude, longitude, city, state, country, category } = req.body;

//   try {
//     const place = await Place.findByPk(id);
//     if (place) {
//       place.name = name || place.name;
//       place.address = address || place.address;
//       place.latitude = latitude || place.latitude;
//       place.longitude = longitude || place.longitude;
//       place.city = city || place.city;
//       place.state = state || place.state;
//       place.country = country || place.country;
//       place.category = category || place.category;
//       await place.save();
//       res.json(place);
//     } else {
//       res.status(404).json({ message: 'Place not found' });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // DELETE /places/:id
// export const deletePlace = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const place = await Place.findByPk(id);
//     if (place) {
//       await place.destroy();
//       res.json({ message: 'Place deleted' });
//     } else {
//       res.status(404).json({ message: 'Place not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };