import '../config/connection.js';

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { EventFactory } from './event.js';

// Initialize the Sequelize instance
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, { logging: false }) // Disable logging for URL-based connection
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

// Initialize models
const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);

// Define associations
User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Sync all models with the database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully from models.ts.');
  })
  .catch((err) => {
    console.error('Database sync failed. Exiting...', err);
    process.exit(1);
  });

export { sequelize, User, Event };