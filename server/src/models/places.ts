console.log('****starting server/src/models/places.ts****')

import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Event } from './event.js'; // Import Event model for associations


// Define the attributes for the Place model
interface PlaceAttributes {
  id: string;                 // Foursquare Place ID (string-based)
  name: string;               // Place name
  address: string;            // Place address
  city: string;               // City where the place is located
  state: string;              // State where the place is located
  country: string;            // Country where the place is located
  latitude: number;           // Latitude of the place
  longitude: number;          // Longitude of the place
  category: string;           // Place category (e.g., Restaurant, Bar)
  eventId: string;            // Ticketmaster Event ID (foreign key reference)
  url?: string;               // Optional URL for the place (if available)
}

// Define the optional attributes for creating a new Place
interface PlaceCreationAttributes extends Optional<PlaceAttributes, 'id'> {}

// Define the Place class extending Sequelize's Model
export class Place extends Model<PlaceAttributes, PlaceCreationAttributes> implements PlaceAttributes {
  public id!: string;
  public name!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public latitude!: number;
  public longitude!: number;
  public category!: string;
  public eventId!: string;
  public url?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association method
  static associate() {
    Place.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });
  }
}

// Define the PlaceFactory function to initialize the Place model
export function PlaceFactory(sequelize: Sequelize): typeof Place {
  Place.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
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
        validate: {
          min: -90,
          max: 90,
        },
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: -180,
          max: 180,
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'events', // Refers to the 'events' table
          key: 'id',
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'places',
      sequelize,
    }
  );

  return Place;
}