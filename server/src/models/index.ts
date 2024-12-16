console.log('****starting server/src/models/index.ts****')

import '../config/connection.js'

console.log(`models/index.ts_TM_API_BASE_URL: ${process.env.TM_API_BASE_URL}`);
console.log('models/index.ts_TM_API_KEY:', process.env.TM_API_KEY);
console.log(`models/index.ts_FS_API_BASE_URL ${process.env.FS_API_BASE_URL}`);
console.log('models/index.ts_FS_API_KEY:', process.env.FS_API_KEY);

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { EventFactory } from './event.js';
import { PlaceFactory } from './places.js';

// Initialize the Sequelize instance
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, { logging: false })  // Disable logging for URL-based connection
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD || '',
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
        logging: false, // Disable logging here
      }
    );

// Initialize models with unique table names
const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);
const Place = PlaceFactory(sequelize);

// Define associations

// User associations
User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Event and Place associations
Event.hasMany(Place, { foreignKey: 'eventId', as: 'places' });
Place.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// Sync all models with the database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized successfully from models.ts.');
}).catch((err) => {
  console.error('Database sync failed. Exiting...', err);
  process.exit(1);
});

export { sequelize, User, Event, Place };