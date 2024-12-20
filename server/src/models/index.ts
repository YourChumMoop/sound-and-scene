import sequelize from "../config/connection.js";

import { UserFactory } from './user.js';
import { EventFactory } from './event.js';

// Initialize models
const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);

// Define associations
User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { sequelize, User, Event };
