# Contributing to JPLingo

Thanks for your interest! Read on for how to get the repo, work on it, and ship a PR.

## Before you start

- Read the [README](../README.md#-content-attribution) section on **Content
  Attribution**: all lesson content must remain original (not copied from
  textbooks such as *Minna No Nihongo* or third-party repositories).

## Getting set up

```bash
cd frontend && npm install
cd ../backend && npm install && cp .env.example .env
```

See [QUICKSTART](../QUICKSTART.md) for running both sides.

## Working conventions

- **Content** lives in two authoritative places:
  frontend `frontend/src/data/advancedLessons.ts` (used by the app) and
  `backend/src/data/lessons-*.json` (used by the API + tests). When you add a
  **new lesson**, update both and bump the count.
- Keep the app's in-session mechanics (hearts, XP, streak, daily quest)
  deterministic and local — they intentionally avoid hidden timers or network
  calls.
- Run the backend suite (`.tsx`/`.ts`) and the frontend snapshot before opening a PR:

  ```bash
  cd backend && npx tsc --noEmit && npm test
  cd frontend && npm test
  ```

## Pull requests

1. Branch from `main`: `git checkout -b feature/<your-change>`
2. Keep changes small and focused; one lesson set or one mechanic per PR.
3. Update relevant docs (README tables, roadmap rows) in the same PR.
4. Open the PR against `main`.

## Good first contributions

- Translate/add a new lesson or expand a grammar point (update both content dirs).
- Add backend unit tests for `authController` / `userStore` (in-memory store).
- Fill in the API/structure docs in this folder.
