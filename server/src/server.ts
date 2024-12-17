import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import { UserFactory } from './models/user.js';

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false

// Load API keys from environment variables
const TM_API_KEY = process.env.TICKETMASTER_API_KEY || '';
const FS_API_KEY = process.env.FOURSQUARE_API_KEY || '';

if (!TM_API_KEY) console.warn('Warning: Ticketmaster API key is not set.');
if (!FS_API_KEY) console.warn('Warning: Foursquare API key is not set.');

const User = UserFactory(sequelize);

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS (if your client is served from a different origin)
app.use(cors());

// Serve static files from the client's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Use defined routes
app.use('/api', routes);

// Sync database and start the server
sequelize.sync({ force: forceDatabaseRefresh })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error('Database sync failed. Exiting...', err);
    process.exit(1);
  });

export { User, sequelize };