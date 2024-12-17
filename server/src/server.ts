console.log('****starting server/src/server.ts****')

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import { UserFactory } from './models/user.js';

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;


// Initialize User model
const User = UserFactory(sequelize);

// Create __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logging environment variables to verify they are loaded
console.log(`server.ts_TM_API_BASE_URL: ${process.env.TM_API_BASE_URL}`);
console.log('server.ts_TM_API_KEY:', process.env.TM_API_KEY);
console.log(`server.ts_FS_API_BASE_URL ${process.env.FS_API_BASE_URL}`);
console.log('server.ts_FS_API_KEY:', process.env.FS_API_KEY);

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for cross-origin requests
app.use(cors());
console.log('CORS middleware registered.');

// Serve static files from the client's dist folder
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));
console.log(`Serving static files from: ${clientDistPath}`);

// Logging middleware to log incoming requests
app.use((req, _res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Use defined routes
console.log('Registering API routes...');
app.use(routes);

// Sync database and start the server
sequelize
  .sync({ force: forceDatabaseRefresh })
  .then(() => {
    console.log('Database synchronized successfully from server.ts.');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    console.error('Database sync failed. Exiting...', err);
    process.exit(1);
  });

// Export User and sequelize for potential use in other parts of the app
export { User, sequelize };