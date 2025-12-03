# ❄️ SlipBey — Official Portfolio Website

A modern, animated, multi‑language personal website built with **Next.js 16Q**, **React 19**, and the custom **Glass‑Ice** design system.  
Showcases projects, apps, music, YouTube content, and social presence under the SlipBey brand.

🔗 **Live Site:** [https://slip.slipyme.com](https://slip.slipyme.com)  
🧠 **Public API:** [https://api.slipyme.com](https://api.slipyme.com)  
💾 **API Repository:** [https://github.com/slipbey/slipyme-api](https://github.com/slipbey/slipyme-api)

---

## 🚀 Features

- ⚡ **Next.js 16 (App Router)** + React 19
- 🎨 **Tailwind CSS v4** + custom SCSS + Glass‑Ice theme
- 🌓 Dark / Light theme (next‑themes)
- 🌍 Multilingual (TR / EN) JSON‑dict i18n system
- 🎞️ Framer Motion animations (fade, stagger, floatZoom)
- 🧊 Global Glass‑Ice UI kit (cards, buttons, navbar, tabs)
- 🎵 Dynamic **Spotify Releases** via Slipyme API
- 🎥 Dynamic **YouTube Feed** via Slipyme API
- 🧰 Full **Apps** section (Tetris, Snake, Minesweeper, MemeMaker, QRMaker, PasswordGen, etc.)
- 🖼️ Lightbox system for project galleries
- 📬 Contact form → Slipyme API
- 📈 SEO‑ready metadata, sitemap, robots.txt

---

## 🛠️ Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Framework  | Next.js 16 (App Router)              |
| Language   | TypeScript                           |
| Styling    | Tailwind v4 + SCSS + Glass‑Ice theme |
| Animations | Framer Motion                        |
| Icons      | React‑Icons                          |
| Theme      | next‑themes                          |
| i18n       | Custom JSON dict + provider          |
| API        | Slipyme API (api.slipyme.com)        |
| HTTP       | Axios                                |
| Hosting    | Vercel / Node                        |

---

## 📦 Installation

```bash
git clone https://github.com/SlipBey/mywebpage.git
cd mywebpage
npm install
npm run dev
```

Create a `.env` file:

```
NEXT_PUBLIC_API_KEY=your_api_key_here
GITHUB_TOKEN=optional_for_github_feed
```

---

## 📁 Project Structure

```
src/
 ├── app/
 │   ├── page.tsx                 → Home
 │   ├── about/                   → About
 │   ├── projects/                → Projects + Detail
 │   ├── apps/                    → Apps grid + runner
 │   ├── works/                   → Music + YouTube
 │   ├── contact/                 → Contact
 │   ├── api/github/repos/        → GitHub feed proxy
 │   ├── layout.tsx               → Global layout + AppShell
 │   └── not-found.tsx            → 404
 ├── components/
 │   ├── layout/                  → Navbar, Footer, SlidingPill, AppShell
 │   ├── ui/                      → Buttons, SectionTitle, AnimatedSection
 │   └── LightboxProvider.tsx
 ├── features/
 │   ├── home/                    → Hero, ProjectsPreview, AppsPreview
 │   ├── about/                   → Vision, Domains, Timeline, Highlights
 │   ├── projects/                → Grid + Detail UI
 │   ├── apps/                    → Registry + AppRunner
 │   ├── works/                   → Spotify + YouTube
 │   └── contact/                 → Form + Info
 ├── lib/
 │   ├── seo.ts                   → Metadata builder
 │   ├── api.ts                   → Axios instance
 │   ├── animations.ts            → Framer variants
 │   ├── dict.ts                  → I18n dict flattener
 │   └── i18n/                    → Providers & helpers
 ├── i18n/
 │   ├── tr.ts
 │   └── en.ts
 └── styles/
     ├── index.scss
     ├── tetris.scss
     └── globals
```

---

## 🎮 Included Apps / Mini‑Tools

- Random Picker
- Dice Roller
- Tetris
- Snake (touch + keyboard)
- Minesweeper
- TicTacToe
- Memory Match
- QR Maker
- Password Generator (zxcvbn)
- UUID Maker
- Meme Maker
- Image Compress
- Unit Convert
- Name Wheel

---

## 🎵 Integrations

### ✔ Spotify Releases (via Slipyme API)

Used in **Works** page.

### ✔ YouTube Feed (via Slipyme API)

Dynamic thumbnails + view counts.

---

## 📸 Preview

<p align="center">
  <img src="/public/screenshot.png" width="800" alt="Slipyme Website Screenshot">
</p>

---

## 📄 License

All rights reserved © 2025 — SlipBey
Unauthorized copying, modification, or distribution is prohibited.

---

## 👨‍💻 Author

**SlipBey**  
Developed and maintained by **SlipBey**  
🌐 [Website](https://slip.slipyme.com) • 💼 [LinkedIn](https://slip.slipyme.com/linkedin) • 💬 [Discord](https://slip.slipyme.com/discord)
