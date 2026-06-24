# Абырой — Школа подготовки к ЕНТ

Full-stack website for **Abyroi** private preparatory school (UNT coaching center) in Uralsk, Kazakhstan.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS** v4
- **Prisma ORM** v5 + SQLite (local) / PostgreSQL (production)
- **NextAuth.js** v4 (email/password)
- **next-intl** v4 (Russian, Kazakh, English)
- **Framer Motion** v12
- **lucide-react** icons

## Local Setup

### Prerequisites
- Node.js 18+
- npm

### 1. Clone and install

```bash
git clone <repo-url>
cd abyroi
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database setup

```bash
npx prisma migrate dev
npm run db:seed
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Default Accounts

After seeding:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@abyroi.kz | admin123 |
| Applicant (PENDING) | aidana@test.kz | student123 |
| Applicant (EXAM) | bolat@test.kz | parent123 |

## Pages

| URL | Description |
|-----|-------------|
| `/` | Homepage with hero, stats, teachers, news |
| `/about` | About school, mission, gallery |
| `/programs` | Academic programs (4 tracks) |
| `/combos` | UNT subject combinations |
| `/teachers` | Teacher profiles (public) |
| `/admissions` | Enrollment info + FAQ |
| `/news` | News & announcements |
| `/contact` | Contact form + info |
| `/apply` | Enrollment application form |
| `/login` | Login page |
| `/dashboard` | Applicant personal cabinet |
| `/admin` | Admin overview |
| `/admin/applications` | Manage applications |
| `/admin/teachers` | Manage teacher profiles |
| `/admin/news` | Manage news posts |

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push origin main
```

### 2. Create Vercel project

Go to [vercel.com](https://vercel.com) → New Project → Import your repo.

### 3. Add Vercel Postgres

In Vercel dashboard → Storage → Create Database → Postgres.

Copy the `DATABASE_URL` from the Vercel Postgres connection string.

### 4. Set environment variables in Vercel

```
DATABASE_URL=postgresql://...  (from Vercel Postgres)
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app.vercel.app
```

### 5. Update schema for PostgreSQL

Change `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

And update `UNTCombo` model to use `String[]` arrays (PostgreSQL supports native arrays).

### 6. Deploy & seed

After first deploy, run seed via Vercel CLI:
```bash
npx vercel env pull .env.production.local
npx prisma migrate deploy
npm run db:seed
```

## i18n

Language switcher in navbar. Supported:
- 🇷🇺 Russian (`/ru/...`) — default
- 🇰🇿 Kazakh (`/kz/...`)


Messages in `messages/ru.json`, `messages/kz.json`, `messages/en.json`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:seed` | Seed database |
| `npm run db:reset` | Reset DB and re-seed |

