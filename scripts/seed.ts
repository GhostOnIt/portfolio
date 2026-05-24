import 'dotenv/config';
import { db } from '../db';
import { blogPosts, caseStudies, projects, skills } from '../db/schema';
import { seedBlogPosts, seedCaseStudies, seedProjects, seedSkills } from '../db/seed-data';

// Seed each table only if it is empty, so this is safe to run on every
// Vercel build: it populates the initial content once and never overwrites
// data edited through the admin afterwards. The neon-http driver runs each
// query as a separate request (no transactions), which is fine here.
async function seedIfEmpty<T extends { values: (rows: any) => any }>(
  name: string,
  table: any,
  rows: any[],
) {
  const existing = await db.select().from(table).limit(1);
  if (existing.length > 0) {
    console.log(`  • ${name}: already populated, skipping`);
    return;
  }
  await db.insert(table).values(rows);
  console.log(`  ✓ ${name}: inserted ${rows.length}`);
}

async function main() {
  console.log('Seeding database (empty tables only)...');
  await seedIfEmpty('blog posts', blogPosts, seedBlogPosts);
  await seedIfEmpty('case studies', caseStudies, seedCaseStudies);
  await seedIfEmpty('projects', projects, seedProjects);
  await seedIfEmpty('skills', skills, seedSkills);
  console.log('Seed complete.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
