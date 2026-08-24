# ardev.dev

Personal portfolio for **Abdulrahman Morshed (AR Dev)** — [ardev.dev](https://ardev.dev).

Built with **Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion** (same stack as maskani_web).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Content

All copy, projects, packages, and links live in **`lib/data.ts`** — edit that one file to update the whole site.

## Deploy

Deploys to Vercel on every push to `main` via `.github/workflows/deploy.yml`
(`vercel build` auto-detects Next.js; `framework: "nextjs"` is pinned in `vercel.json`).
