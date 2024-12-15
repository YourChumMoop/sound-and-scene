// import dotenv from 'dotenv';
// dotenv.config();

// import { Sequelize } from 'sequelize';
// import { UserFactory } from './user.js';
// import { EventFactory } from './event.js';
// import { PlaceFactory } from './places.js';

// // Initialize the Sequelize instance
// const sequelize = process.env.DB_URL
//   ? new Sequelize(process.env.DB_URL)
//   : new Sequelize(
//       process.env.DB_NAME || '',
//       process.env.DB_USER || '',
//       process.env.DB_PASSWORD || '',
//       {
//         host: 'localhost',
//         dialect: 'postgres',
//         dialectOptions: {
//           decimalNumbers: true,
//         },
//         logging: console.log, // Add logging to debug SQL queries
//       }
//     );

// // Initialize models with unique table names
// const User = UserFactory(sequelize);
// const Event = EventFactory(sequelize);
// const Place = PlaceFactory(sequelize);

// // Define associations

// // User associations
// User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
// Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// // Event and Place associations
// Event.hasMany(Place, { foreignKey: 'eventId', as: 'places' });
// Place.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// // Sync all models with the database
// sequelize.sync({ alter: true }).then(() => {
//   console.log('Database synchronized successfully.');
// }).catch((err) => {
//   console.error('Database sync failed. Exiting...', err);
//   process.exit(1);
// });

// export { sequelize, User, Event, Place };