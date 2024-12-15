import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Place } from './places.js'; // Updated import to reference places.ts

// Define the attributes for the Event model
interface EventAttributes {
  id: string;          // Ticketmaster Event ID (string-based)
  name: string;        // Event name/title
  date: string;        // Event date in ISO format (2024-06-15)
  time: string;        // Event time (optional)
  city: string;        // City where the event is held
  state: string;       // State where the event is held
  country: string;     // Country where the event is held
  latitude: number;    // Latitude of the event
  longitude: number;   // Longitude of the event
  url: string;         // Ticketmaster event URL
  imageUrl: string;    // URL for the event image
  placeId?: string;    // Foreign key to the Place model
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
  public placeId?: string;

  // Association to the Place model
  public readonly place?: Place;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      placeId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'places', // Refers to the 'places' table
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