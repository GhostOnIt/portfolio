# Portfolio — Alexandre Sonicka Gomah

Personal portfolio site for **Alexandre Sonicka Gomah**, DevOps Engineer based in Pointe-Noire, Republic of Congo.

Built on top of a cyber-terminal-themed React + TypeScript + Vite template, customized with my own profile, experience, and project case studies.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS
- Framer Motion
- React Router

## Local Development

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:5173.

## Contact Form

The contact form posts to a Vercel serverless function (`api/contact.ts`) that relays via SMTP (Brevo). Set these environment variables in Vercel (Project → Settings → Environment Variables) — and locally in a `.env` file for `vercel dev`:

```
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=your_brevo_smtp_login
MAIL_PASSWORD=your_brevo_smtp_key
MAIL_FROM_ADDRESS=no-reply@your-domain.tld
MAIL_FROM_NAME=My Portfolio
MAIL_TO=where_to_receive_messages@example.com
```

These are server-side only — no `VITE_` prefix, so they never reach the browser bundle. `.env` is gitignored.

## Contact

- LinkedIn: [linkedin.com/in/alexandre-gomah](https://www.linkedin.com/in/alexandre-gomah)
- GitHub: [github.com/GhostOnIt](https://github.com/GhostOnIt)
- Email: alexsonicka11@gmail.com
