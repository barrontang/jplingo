# JPLingo — Quick Start

A 2-minute path to a running app. For full detail see [README.md](../README.md).

## 1) Frontend only (fastest — the app runs fully offline)

```bash
cd frontend
npm install
npm run android   # or: npm run ios
```

Open the Expo web target with `npx expo start --web`. No backend or database
is required to learn, quiz, or track progress locally.

## 2) Backend API

```bash
cd backend
npm install
cp .env.example .env      # then set JWT_SECRET to a long random value
docker-compose up -d      # from repo root: starts PostgreSQL + Redis
npm run prisma:generate
npm run migrate           # apply migrations to the dev database
npm run dev               # http://localhost:3000
npm test                  # run the Jest suite
```

> The frontend currently runs standalone. Wiring it to the backend is a future
> step (see [../NEXT_STEPS.md](../NEXT_STEPS.md)).

## 3) Verify

- Backend health: `curl http://localhost:3000/health`  -> `{"status":"OK"}`
- Frontend test: `cd frontend && npm test`
