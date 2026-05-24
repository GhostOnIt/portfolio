import 'dotenv/config';
import { db } from '../db';
import { blogPosts, caseStudies, projects, skills } from '../db/schema';
import { seedBlogPosts, seedCaseStudies, seedProjects, seedSkills } from '../db/seed-data';

async function main() {
  console.log('Seeding database...');

  // Idempotent: clear then insert. The neon-http driver runs each query
  // as a separate request (no transactions), which is fine for seeding.
  await db.delete(blogPosts);
  await db.delete(caseStudies);
  await db.delete(projects);
  await db.delete(skills);

  await db.insert(blogPosts).values(seedBlogPosts);
  console.log(`  ✓ ${seedBlogPosts.length} blog posts`);

  await db.insert(caseStudies).values(seedCaseStudies);
  console.log(`  ✓ ${seedCaseStudies.length} case studies`);

  await db.insert(projects).values(seedProjects);
  console.log(`  ✓ ${seedProjects.length} projects`);

  await db.insert(skills).values(seedSkills);
  console.log(`  ✓ ${seedSkills.length} skills`);

  console.log('Seed complete.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
