# Setup Guide

Full, step-by-step setup for JPLingo. A condensed version lives in
[QUICKSTART.md](../QUICKSTART.md).

## Prerequisites

- Node.js >= 18
- For the backend database/cache: Docker (provides PostgreSQL + Redis)
- For mobile emulators: Xcode (iOS) and Android Studio (Android)

## 1. Frontend (React Native / Expo)

```bash
cd frontend
npm install
npm run android     # or npm run ios / npx expo start --web
```

The frontend is fully self-contained: lesson content, quizzes, and progress
state all run in-session with no backend or database required.

## 2. Backend (Express API)

```bash
cd backend
npm install
cp .env.example .env        # then set JWT_SECRET (see .env.example comment)
```

### 2a. Start infrastructure

From the repository root:

```bash
docker-compose up -d        # PostgreSQL on :5432, Redis on :6379
docker-compose down         # stop
docker-compose down -v      # stop and drop data
```

Or run PostgreSQL / Redis locally and set `DATABASE_URL` / `REDIS_URL` in
`backend/.env`.

### 2b. Prepare the database and run

```bash
cd backend
npm run prisma:generate
npm run migrate             # applies prisma/migrations/* to the dev database
npm run dev                 # nodemon: http://localhost:3000
npm run build && npm start  # compile then run the server
npm test                    # Jest
```

## Environment variables

All documented in `backend/.env.example`. The only required one at runtime is
`JWT_SECRET` (used by `middleware/auth.ts` to verify tokens).

## Troubleshooting

- `JWT_SECRET is not defined` at startup — you did not run `cp .env.example .env`
  or left the placeholder empty.
- `prisma migrate` fails — make sure PostgreSQL is running
  (`docker ps`) and `DATABASE_URL` matches the running instance.
