# 🖥️ DevOps Portfolio Template — Cyber Terminal Aesthetic

> A free, open-source DevOps portfolio website template for Cloud Engineers, SREs, and DevOps professionals.  
> Built with **React + TypeScript**, featuring a cyber terminal design, interactive blog, case studies, and CI/CD-ready deployment on Vercel.

<p align="center">
  <a href="https://github.com/neerajnakka/devops-portfolio/stargazers">
    <img src="https://img.shields.io/github/stars/neerajnakka/devops-portfolio?style=for-the-badge&color=00ff41&labelColor=0a0a0a" alt="GitHub Stars" />
  </a>
  <a href="https://github.com/neerajnakka/devops-portfolio/network/members">
    <img src="https://img.shields.io/github/forks/neerajnakka/devops-portfolio?style=for-the-badge&color=00ff41&labelColor=0a0a0a" alt="GitHub Forks" />
  </a>
  <a href="https://github.com/neerajnakka/devops-portfolio/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-00ff41?style=for-the-badge&labelColor=0a0a0a" alt="MIT License" />
  </a>
  <a href="https://neeraj-devops.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-00ff41?style=for-the-badge&labelColor=0a0a0a&logo=vercel" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <b><a href="https://neeraj-devops.vercel.app">🔴 Live Demo</a></b> •
  <b><a href="#-quick-start">Quick Start</a></b> •
  <b><a href="#-customization-guide">Customization</a></b> •
  <b><a href="#-deployment">Deploy</a></b>
</p>

---

## 🤔 Who Is This For?

If you are a **DevOps engineer, Cloud Engineer, or SRE** who:

- Wants a portfolio that looks like it belongs in a terminal — not a marketing agency
- Is targeting product-based companies, startups, or FAANG-adjacent roles
- Wants to stand out from generic Notion or Google Sites portfolios
- Needs a ready-to-deploy solution in under 10 minutes

**This template is for you.**

Recruiters spend an average of 6 seconds on a resume. A portfolio like this helps them quickly understand your technical depth and project experience — before they even read a word.

---

## 🖥️ Preview

> Live at → **[neeraj-devops.vercel.app](https://neeraj-devops.vercel.app)**

| Section | What You Get |
|---|---|
| 🏠 Home | Animated terminal hero, typewriter effect, neon aesthetic |
| 🛠️ Skills | Visual proficiency indicators for full DevOps toolchain |
| 📁 Projects | Filterable project cards with tech stack tags |
| 📊 Case Studies | Challenge → Solution → Impact breakdowns with metrics |
| 📝 Blog | Modal-based reading, view counts, category filters |
| 📬 Contact | Web3Forms-powered contact form, no backend required |

---

## 🚀 Quick Start

**Fork → Customize → Deploy in under 10 minutes.**

```bash
# Step 1 — Clone your fork
git clone https://github.com/YOUR_USERNAME/devops-portfolio.git
cd devops-portfolio

# Step 2 — Install dependencies
npm install

# Step 3 — Set up environment (required for contact form)
cp .env.example .env
# Open .env and add your Web3Forms key (free at web3forms.com)

# Step 4 — Run locally
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) — you should see the full site.

<a href="https://vercel.com/new/clone?repository-url=https://github.com/neerajnakka/devops-portfolio">
  <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

---

## ✨ Features

### 🎯 Portfolio Core
- **Cyber Terminal Design** — Electric neon green theme, monospace fonts, authentic command-line aesthetic
- **3D Animated Background** — Dynamic grid powered by Three.js
- **Typewriter & Glitch Effects** — Smooth transitions powered by Framer Motion
- **Fully Responsive** — Optimized for desktop, tablet, and mobile
- **Interactive Skill Explorer** — Visual proficiency indicators for DevOps toolchain
- **Project Filtering** — Filter projects by technology stack

### 📝 Interactive Tech Blog (`/blog`)
- Full article modal reading experience
- Real-time view count tracking
- Category filtering (DevOps, Cloud Infrastructure, Full-Stack)
- Search, sort by date / views / likes
- Featured article highlights

### 📊 Case Studies (`/case-studies`)
- Detailed challenge → solution → impact breakdowns
- Realistic performance metrics
- Before/after comparisons
- Full technology stack context per project

### 🛠️ DevOps-Ready Deployment
- Vercel auto-deployment on push to `main`
- SPA redirect rules pre-configured (`vercel.json`)
- Environment variable support for secrets
- Netlify-compatible with one config file

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Routing | React Router |
| 3D Effects | Three.js |
| Icons | Lucide React |
| Contact Form | Web3Forms (free, no backend) |
| Deployment | Vercel |

---

## ⚠️ Environment Setup (Required for Contact Form)

The contact form uses **[Web3Forms](https://web3forms.com)** — a free service that delivers form submissions to your email. You must replace the API key with your own before deploying.

### Step 1 — Get your free Web3Forms key (30 seconds)
Go to [web3forms.com](https://web3forms.com) → enter your email → copy your access key.

### Step 2 — Set up your local `.env` file
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_WEB3FORMS_KEY=your_access_key_here
```

### Step 3 — Add to Vercel (for production)
In your Vercel project → **Settings** → **Environment Variables**:

| Key | Value | Environments |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | `your_access_key_here` | Production, Preview, Development |

After adding, **redeploy** the project (push a commit or use Vercel dashboard → Redeploy).

> **Never commit your `.env` file.** It is already in `.gitignore`.

---

## 🎨 Customization Guide

### Your Personal Information

| What to change | File |
|---|---|
| Name, role, bio | `src/data/portfolio.ts` or `src/pages/Home.tsx` |
| Navigation links | `src/components/Navbar.tsx` |
| Footer links + socials | `src/components/Footer.tsx` |
| Skills & proficiency | `src/pages/Skills.tsx` |
| Contact details | `src/data/portfolio.ts` |

### Your Projects & Case Studies

Edit the `caseStudies` array in:
```
src/components/case-studies/EnhancedCaseStudies.tsx
```

Each entry supports: title, problem statement, solution, tech stack, and before/after metrics.

### Your Blog Posts

Edit the `blogPosts` array in:
```
src/components/blog/EnhancedBlog.tsx
```

### Colors & Branding

```js
// tailwind.config.js — change the neon green to your preferred accent
colors: {
  primary: {
    500: '#00ff41',   // ← your primary accent color
  },
  'bg-page':    '#0a0a0a',   // ← main background
  'bg-surface': '#111111',   // ← card background
}
```

### Fonts & Animations
- Typography: `src/index.css`
- Animation config: `src/components/visual/VisualComponents.tsx`

---

## 📁 Project Structure

```
devops-portfolio/
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   └── EnhancedBlog.tsx          # Blog with modal reading + metrics
│   │   ├── case-studies/
│   │   │   └── EnhancedCaseStudies.tsx   # Case studies with impact data
│   │   ├── visual/
│   │   │   └── VisualComponents.tsx      # Reusable animated UI components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── portfolio.ts                  # ← your name, links, contact info
│   ├── pages/                            # Route-level page components
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env.example                          # ← copy this to .env
├── .gitignore
├── vercel.json                           # SPA redirect rules
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Deployment

### Vercel (Recommended — Free)

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) → Import your fork
3. Add `VITE_WEB3FORMS_KEY` in **Settings → Environment Variables**
4. Deploy — live in under 2 minutes

### Netlify

```bash
npm run build
# Upload the `dist/` folder to Netlify Drop
```

Create a `netlify.toml` file in the project root:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🔧 Development Scripts

```bash
npm run dev          # Start development server (localhost:5173)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📱 Browser Support

Chrome, Firefox, Safari, Edge (latest versions) · iOS Safari · Chrome Mobile

---

## 📄 License

MIT — free to use, fork, and deploy for personal and commercial use.

---

## 👨‍💻 About This Project

Originally built by **Neeraj Chandra Nakka** as a DevOps portfolio template for cloud, SRE, and infrastructure engineers.

This portfolio is designed for DevOps engineers who want something that looks like it belongs in a terminal — not a Wix page. If you're targeting product-based companies, a portfolio like this helps recruiters quickly understand your technical depth and project experience.

## 🔗 Links

- **Live Site**: [neeraj-devops.vercel.app](https://neeraj-devops.vercel.app)
- **GitHub**: [github.com/neerajnakka](https://github.com/neerajnakka)
- **LinkedIn**: [linkedin.com/in/neerajchandran](https://linkedin.com/in/neerajchandran)

---

<p align="center">
  <b>If this template helped you land a job or get noticed, drop a ⭐ — it helps other DevOps engineers find it.</b><br/>
  <i>One click. It means a lot.</i>
</p>
