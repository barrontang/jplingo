# Project Structure

High-level map of the JPLingo repository. The live application runs in the
frontend as a single component module; the backend is a separate Express API
(not yet wired to the frontend).

```
jplingo/
│
├── frontend/                    Expo / React Native app
│   ├── App.tsx                  # Entire UI + game logic (hearts/XP/streak/quest)
│   ├── index.js                 # RN entry point
│   ├── __tests__/               # Frontend snapshot tests
│   └── src/
│       └── data/
│           └── advancedLessons.ts   # N3-N1 lesson content (used by App.tsx)
│
├── backend/                     Express + TypeScript API
│   ├── src/
│   │   ├── index.ts             # Server entry (helmet, cors, routes)
│   │   ├── routes/              # auth / lessons / users / progress routers
│   │   ├── controllers/         # Request handlers
│   │   ├── middleware/          # authenticate (JWT), errorHandler
│   │   └── services/            # lessonService (loads JSON), userStore (in-memory)
│   ├── prisma/                 # schema + migrations (PostgreSQL)
│   ├── data/                   # Lesson JSON (40 lessons, N5->N1)
│   ├── Dockerfile              # Build + run the API container
│   └── .env.example            # Copy to .env and set secrets
│
├── database/
│   └── init.sql                # Minimal PostgreSQL init (Prisma owns schema)
├── docker-compose.yml          # PostgreSQL + Redis for local dev
├── docs/                       # This folder
│
└── package.json                # Root orchestration scripts (dev/test/build)
```

## Where to add content

- **Frontend** (what the app renders): `frontend/src/data/advancedLessons.ts`
  and the `lessonContent` map inside `frontend/App.tsx`.
- **Backend** (API + tests): `backend/src/data/lessons-*.json`.

Keep both in sync when adding a new lesson — see
[CONTRIBUTING](./CONTRIBUTING.md).

## Note on the past architecture

Earlier planning folders (Redux `store/`, `navigation/`, `services/`, `screens/`,
`types/`) were removed because they were unused empty stubs. If a Redux +
React-Navigation split is reintroduced, it should go under `frontend/src/`.
