import type { VercelRequest, VercelResponse } from '@vercel/node';
import { asc } from 'drizzle-orm';
import { db } from '../db/index.js';
import { skills, skillCategories } from '../db/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const resource = Array.isArray(req.query.resource) ? req.query.resource[0] : req.query.resource;

  try {
    if (resource === 'skills') {
      const rows = await db.select().from(skills).orderBy(asc(skills.sortOrder));
      return res.status(200).json(rows);
    }

    if (resource === 'skillCategories') {
      const rows = await db.select().from(skillCategories).orderBy(asc(skillCategories.sortOrder));
      return res.status(200).json(rows.filter((row) => row.visible));
    }

    return res.status(400).json({ error: 'Unknown resource' });
  } catch (err) {
    console.error(`public content ${resource} failed`, err);
    return res.status(500).json({ error: 'Database error' });
  }
}
