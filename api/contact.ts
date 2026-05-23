import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {};
  const { name, email, subject, message, website } = body;

  if (website) {
    return res.status(200).json({ success: true });
  }

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !EMAIL_RE.test(email) ||
    typeof subject !== 'string' || !subject.trim() ||
    typeof message !== 'string' || message.trim().length < 10
  ) {
    return res.status(400).json({ success: false, error: 'Invalid input' });
  }

  const {
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME,
    MAIL_TO,
  } = process.env;

  if (!MAIL_HOST || !MAIL_PORT || !MAIL_USERNAME || !MAIL_PASSWORD || !MAIL_FROM_ADDRESS || !MAIL_TO) {
    console.error('Missing SMTP env vars');
    return res.status(500).json({ success: false, error: 'Server misconfigured' });
  }

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: Number(MAIL_PORT) === 465,
    auth: { user: MAIL_USERNAME, pass: MAIL_PASSWORD },
  });

  const fromName = MAIL_FROM_NAME ?? 'Portfolio';
  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanSubject = subject.trim();
  const cleanMessage = message.trim();

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${MAIL_FROM_ADDRESS}>`,
      to: MAIL_TO,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `[Portfolio] ${cleanSubject}`,
      text: `From: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
      html: `<p><strong>From:</strong> ${escapeHtml(cleanName)} &lt;${escapeHtml(cleanEmail)}&gt;</p>
<p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
<hr/>
<p>${escapeHtml(cleanMessage).replace(/\n/g, '<br/>')}</p>`,
    });

    await transporter.sendMail({
      from: `"${fromName}" <${MAIL_FROM_ADDRESS}>`,
      to: cleanEmail,
      subject: `Re: ${cleanSubject} — message received`,
      text: `Hi ${cleanName},

Thanks for reaching out. I've received your message and will get back to you within 24 hours.

For reference, here's what you sent:

"${cleanMessage}"

Best,
Alexandre`,
      html: `<p>Hi ${escapeHtml(cleanName)},</p>
<p>Thanks for reaching out. I've received your message and will get back to you within 24 hours.</p>
<p><em>For reference, here's what you sent:</em></p>
<blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#555;">${escapeHtml(cleanMessage).replace(/\n/g, '<br/>')}</blockquote>
<p>Best,<br/>Alexandre</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP send failed', err);
    return res.status(500).json({ success: false, error: 'Failed to send' });
  }
}
