import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user.js'; // Import User model

// Define the attributes for the Event model
interface EventAttributes {
  id: string;
  name: string;
  date: string;
  time: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  url: string;
  imageUrl: string;
  userId?: number; // Foreign key to the User model
}

// Define the optional attributes for creating a new Event
interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

// Define the Event class extending Sequelize's Model
export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: string;
  public name!: string;
  public date!: string;
  public time!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public latitude!: number;
  public longitude!: number;
  public url!: string;
  public imageUrl!: string;
  public userId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association with User
  public readonly user?: User;
}

// Define the EventFactory function to initialize the Event model
export function EventFactory(sequelize: Sequelize): typeof Event {
  Event.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'music_events',
      sequelize,
    }
  );

  return Event;
}