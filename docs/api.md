# JPLingo API

Base URL (dev): `http://localhost:3000`

The API is written in Express + TypeScript. Auth-protected routes require a
`Authorization: Bearer <token>` header obtained from `/auth/login` or
`/auth/register`.

> Status: the lesson/roadmap endpoints are functional and tested. Auth endpoints
> currently use an in-memory user store (`services/userStore.ts`) as a demo
> fallback until the Prisma/PostgreSQL layer is wired up. See [SETUP](./SETUP.md).

## Health

| Method | Path      | Auth | Description                    |
|--------|-----------|------|--------------------------------|
| GET    | `/`       | No   | Service banner + version       |
| GET    | `/health` | No   | `{"status":"OK"}`              |

## Auth

| Method | Path            | Auth | Body                                   | Notes |
|--------|-----------------|------|----------------------------------------|-------|
| POST   | `/auth/register`| No   | `{ username, email, password }`        | Returns user + JWT                 |
| POST   | `/auth/login`   | No   | `{ email, password }`                  | Returns user + JWT                 |
| POST   | `/auth/logout`  | Yes  | —                                      | Stateless; client discards token |
| GET    | `/auth/me`      | Yes  | —                                      | Current user profile             |

## Lessons

| Method | Path                                   | Auth | Description |
|--------|----------------------------------------|------|-------------|
| GET    | `/lessons`                             | Yes  | All lessons; optional `?level=N5..N1` |
| GET    | `/lessons/:id`                         | Yes  | Single lesson by number       |
| GET    | `/lessons/:id/vocabulary`              | Yes  | Vocabulary for a lesson       |
| GET    | `/lessons/:id/exercises`               | Yes  | Exercises for a lesson        |
| POST   | `/lessons/:id/exercises/:exerciseId/submit` | Yes | Submit an answer     |

JLPT mapping (in-app approximation, not a certification): 1-15 -> N5,
16-25 -> N4, 26-30 -> N3, 31-35 -> N2, 36-40 -> N1.

## Users / Progress

| Method | Path            | Auth | Description |
|--------|-----------------|------|-------------|
| GET    | `/users/profile`| Yes  | Fetch profile        |
| PUT    | `/users/profile`| Yes  | Update profile       |
| GET    | `/users/achievements` | Yes | List achievements |
| GET    | `/users/leaderboard` | Yes  | Leaderboard         |
| GET     | `/progress`         | Yes    | Full progress record   |
| POST    | `/progress/update` | Yes    | Update a progress entry |
| GET     | `/progress/stats`   | Yes    | Aggregated stats       |

## Errors

Errors follow the shape `{ success: false, error: string }` with a matching
HTTP status (400, 401, 404, 409, 500).
