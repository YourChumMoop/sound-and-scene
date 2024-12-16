console.log('****starting server/src/config/connection.ts****')

import dotenv from 'dotenv';
dotenv.config();

console.log(`connection.ts_TM_API_BASE_URL: ${process.env.TM_API_BASE_URL}`);
console.log('connection.ts_TM_API_KEY:', process.env.TM_API_KEY);
console.log(`connection.ts_FS_API_BASE_URL ${process.env.FS_API_BASE_URL}`);
console.log('connection.ts_FS_API_KEY:', process.env.FS_API_KEY);

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

export default sequelize;
