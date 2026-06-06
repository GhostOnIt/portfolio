import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { migrate as migrateNeon } from 'drizzle-orm/neon-http/migrator';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import { migrate as migratePostgres } from 'drizzle-orm/postgres-js/migrator';
import { sql as drizzleSql } from 'drizzle-orm';
import postgres from 'postgres';

async function ensureSkillCategoriesTable(db: { execute: (query: unknown) => Promise<unknown> }) {
  await db.execute(drizzleSql`
    CREATE TABLE IF NOT EXISTS "skill_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" text NOT NULL,
      "label" text NOT NULL,
      "icon" text,
      "color" text DEFAULT 'text-primary-500' NOT NULL,
      "visible" boolean DEFAULT true NOT NULL,
      "sort_order" integer DEFAULT 0 NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "skill_categories_slug_unique" UNIQUE("slug")
    );
  `);
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
  const databaseUrl = process.env.DATABASE_URL;
  const useLocalPostgres =
    process.env.DATABASE_DRIVER === 'postgres' ||
    databaseUrl.includes('@db:') ||
    databaseUrl.includes('@localhost:') ||
    databaseUrl.includes('@127.0.0.1:');

  console.log('Applying migrations...');
  if (useLocalPostgres) {
    const sql = postgres(databaseUrl, { max: 1 });
    const db = drizzlePostgres(sql);
    await migratePostgres(db, { migrationsFolder: './db/migrations' });
    await ensureSkillCategoriesTable(db);
    await sql.end();
  } else {
    const sql = neon(databaseUrl);
    const db = drizzleNeon(sql);
    await migrateNeon(db, { migrationsFolder: './db/migrations' });
    await ensureSkillCategoriesTable(db);
  }
  console.log('Migrations applied.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
