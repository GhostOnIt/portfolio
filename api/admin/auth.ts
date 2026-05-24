import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { signToken, setSessionCookie, clearSessionCookie, getSession } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET → current session ("me")
  if (req.method === 'GET') {
    const session = getSession(req);
    if (!session) return res.status(401).json({ authenticated: false });
    return res.status(200).json({ authenticated: true, email: session.email });
  }

  // POST → login
  if (req.method === 'POST') {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_PASSWORD_HASH, AUTH_SECRET } = process.env;
    if (!ADMIN_EMAIL || (!ADMIN_PASSWORD && !ADMIN_PASSWORD_HASH) || !AUTH_SECRET) {
      console.error('Missing admin auth env vars');
      return res.status(500).json({ error: 'Server misconfigured' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {};
    const { email, password } = body;
    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const emailOk = email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();
    const passwordOk = ADMIN_PASSWORD
      ? password === ADMIN_PASSWORD
      : await bcrypt.compare(password, ADMIN_PASSWORD_HASH as string);
    if (!emailOk || !passwordOk) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    setSessionCookie(req, res, signToken(ADMIN_EMAIL));
    return res.status(200).json({ authenticated: true, email: ADMIN_EMAIL });
  }

  // DELETE → logout
  if (req.method === 'DELETE') {
    clearSessionCookie(req, res);
    return res.status(200).json({ authenticated: false });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
