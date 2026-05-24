import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq, asc, desc } from 'drizzle-orm';
import { db } from '../../db';
import { blogPosts, caseStudies, projects, skills } from '../../db/schema';
import { requireAuth } from '../_lib/auth';

const RESOURCES = {
  blog: { table: blogPosts, order: desc(blogPosts.date), hasTimestamps: true },
  caseStudies: { table: caseStudies, order: asc(caseStudies.sortOrder), hasTimestamps: true },
  projects: { table: projects, order: asc(projects.sortOrder), hasTimestamps: true },
  skills: { table: skills, order: asc(skills.sortOrder), hasTimestamps: false },
} as const;

type ResourceKey = keyof typeof RESOURCES;

function isResourceKey(v: unknown): v is ResourceKey {
  return typeof v === 'string' && v in RESOURCES;
}

function sanitize(body: Record<string, unknown>) {
  const { id, createdAt, updatedAt, ...rest } = body;
  void id; void createdAt; void updatedAt;
  return rest;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;

  const resourceParam = Array.isArray(req.query.resource) ? req.query.resource[0] : req.query.resource;
  if (!isResourceKey(resourceParam)) {
    return res.status(400).json({ error: 'Unknown resource' });
  }
  const { table, order, hasTimestamps } = RESOURCES[resourceParam];

  const idParam = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const id = idParam !== undefined ? Number(idParam) : undefined;
  if (idParam !== undefined && !Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};

  try {
    switch (req.method) {
      case 'GET': {
        if (id !== undefined) {
          const [row] = await db.select().from(table).where(eq(table.id, id)).limit(1);
          if (!row) return res.status(404).json({ error: 'Not found' });
          return res.status(200).json(row);
        }
        const rows = await db.select().from(table).orderBy(order);
        return res.status(200).json(rows);
      }

      case 'POST': {
        const values = sanitize(body);
        const [row] = await db.insert(table).values(values as never).returning();
        return res.status(201).json(row);
      }

      case 'PUT': {
        if (id === undefined) return res.status(400).json({ error: 'Missing id' });
        const values = sanitize(body) as Record<string, unknown>;
        if (hasTimestamps) values.updatedAt = new Date();
        const [row] = await db.update(table).set(values as never).where(eq(table.id, id)).returning();
        if (!row) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(row);
      }

      case 'DELETE': {
        if (id === undefined) return res.status(400).json({ error: 'Missing id' });
        const [row] = await db.delete(table).where(eq(table.id, id)).returning();
        if (!row) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json({ deleted: row.id });
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error(`content ${req.method} ${resourceParam} failed`, err);
    return res.status(500).json({ error: 'Database error' });
  }
}
