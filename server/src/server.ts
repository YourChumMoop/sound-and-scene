import './config/connection.js';
import express from 'express';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use centralized routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// env file setup:
// TM_API_BASE_URL=https://app.ticketmaster.com/discovery/v2
// TM_API_KEY=your_api_key
// FS_API_BASE_URL=https://api.foursquare.com/v3/places
// FS_API_KEY=your_api_key

// example api requests
// http://localhost:3000/api/events?postalCode=10001
// http://localhost:3000/api/places?ll=40.7128,-74.0060&radius=1000&limit=5