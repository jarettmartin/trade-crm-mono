import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

//migrations
// import { InitSchema1747595250905 } from './migrations/1747595250905-InitSchema'; // 👈 import this

/**
 * Connection details for typeorm migrations. Not to be confused with typeorm.config.ts
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'trade_crm_db',
  entities: ['/**/*.entity.{ts,js}'],
  migrations: ['src/db/migrations/*.{ts,js}'],
  synchronize: false,
});
