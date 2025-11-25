
# Swayam Allewar – Full Stack Developer Portfolio

Welcome to my portfolio website! This project showcases my web-development skills, hackathon wins, AI-powered projects and full-stack expertise through a sleek, modern demo built with Next.js and Tailwind CSS.

## 🚀 Built With

- [Next.js](https://nextjs.org) (App Router, Server / Client Components)  
- [Tailwind CSS](https://tailwindcss.com) for responsive & utility styling  
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode toggle  
- [Resend](https://resend.com) email API for contact form submissions  
- GitHub GraphQL API for contribution stats display  
- Deployment via Vercel
   - [Vercel deployed link](https://vercel.com/swayam-allewars-projects/portfolio-assignment/7XZpWyEHCm6Cezaas3vdxZETi8J1) Link for Submission
## 📂 Features

- Home / About / Projects / Skills / Contact sections  
- Animated UI with dark/light theme toggle  
- Interactive “GitHub Contributions” heatmap showing real data  
- Contact form with email submission and rate-limiting  
- Resume section: download button + embedded preview  
- Mobile friendly and optimized for performance (Lighthouse scores)  
- Clean codebase with React hooks, TypeScript and modular components

## 🔧 Getting Started

### Prerequisites

- Node.js (>= v16)  
- npm / pnpm or yarn  
- Git

## Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/Swayam-creator/Portfolio-assignment.git
````

2. Move into project directory

   ```bash
   cd Portfolio-assignment
   ```
3. Install dependencies

   ```bash
   npm install
   ```
4. Create `.env.local` file and add your environment variables

   ```env
   # Required for GitHub stats API
   GITHUB_TOKEN=your_github_personal_access_token

   # Required for email form (Resend)
   RESEND_API_KEY=your_resend_api_key
   MY_EMAIL_ADDRESS=youremail@example.com

   # Optional: public username for client
   NEXT_PUBLIC_GITHUB_USERNAME=Swayam-creator
   ```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Make changes and the page reloads automatically.

### Building for Production

```bash
npm run build
npm run start
```

---

## 📄 Resume Section

You can download my resume directly via the UI or at `/resume.pdf`.
It’s embedded on the site for preview and downloadable for offline review.

---

## ✉️ Contact Form

Use the idea submission form to share your ideas or message me! Submissions send an email via Resend and include basic rate-limiting for spam protection.

---

## 🧠 Contributions Heatmap

This project pulls your real contribution data via GitHub’s GraphQL API (via `/api/github-contributions`) and renders a styled heatmap of the last 365 days. Current streak is calculated and displayed live.

---

## 📂 Directory Structure

```
.
├─ app/                  ← Next.js app directory (pages, layout)
├─ components/           ← Shared UI components (Navbar, ThemeToggle, ResumeSection, etc)
├─ public/               ← Static assets (resume.pdf, icons, images)
├─ styles/               ← Global CSS (Tailwind config, global styles)
├─ lib/                  ← Utility functions and API handlers
├─ hooks/                ← Custom React hooks
├─ .gitignore
├─ next.config.mjs
├─ package.json
└─ README.md
```

---




