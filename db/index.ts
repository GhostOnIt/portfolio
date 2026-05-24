import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const databaseUrl = process.env.DATABASE_URL;
const useLocalPostgres =
  process.env.DATABASE_DRIVER === 'postgres' ||
  databaseUrl.includes('@db:') ||
  databaseUrl.includes('@localhost:') ||
  databaseUrl.includes('@127.0.0.1:');

const neonSql = useLocalPostgres ? null : neon(databaseUrl);
const postgresSql = useLocalPostgres ? postgres(databaseUrl, { max: 1 }) : null;

export const db = useLocalPostgres
  ? drizzlePostgres(postgresSql!, { schema })
  : drizzleNeon(neonSql!, { schema });
export { schema };
