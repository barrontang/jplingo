# JPLingo - Japanese Learning App

> A Duolingo-style Japanese learning application based on **Minna No Nihongo: Beginner 1**

## Project Overview

JPLingo is a mobile-first Japanese learning application that gamifies the learning experience using the proven curriculum from "Minna No Nihongo: Beginner 1" (みんなの日本語 初級I). The app combines spaced repetition, interactive exercises, and gamification elements to make Japanese learning engaging and effective.

## Current Status: ✅ Backend Server Running

| Component | Status |
|-----------|--------|
| Project Plan | ✅ Complete |
| Backend Structure | ✅ Complete |
| Database Schema | ✅ Migrated |
| Backend Server | ✅ Running on port 3000 |
| Frontend Structure | 🔄 Created (needs RN init) |
| Content/Lessons | 📝 Structure ready |

---

## Tech Stack

### Frontend (Mobile)
- **Framework:** React Native 0.73+
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Navigation:** React Navigation 6
- **HTTP Client:** Axios
- **UI Components:** Custom components with Japanese aesthetic

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma 5.x
- **Database:** PostgreSQL 14+
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** express-validator
- **Logging:** Winston

### Database
- **Primary:** PostgreSQL 14
- **Database Name:** `jplingo_dev`
- **Connection:** `postgresql://tangjiubin@localhost:5432/jplingo_dev`

---

## Database Schema

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     users       │     │    lessons      │     │   vocabulary    │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id              │     │ id              │     │ id              │
│ email           │     │ lessonNumber    │     │ lessonId (FK)   │
│ username        │     │ title           │     │ japanese        │
│ passwordHash    │     │ titleJapanese   │     │ hiragana        │
│ level           │     │ description     │     │ romaji          │
│ xp              │     │ difficulty      │     │ english         │
│ streak          │     │ xpReward        │     │ partOfSpeech    │
│ hearts          │     │ order           │     │ audioUrl        │
│ createdAt       │     │ isUnlocked      │     │ imageUrl        │
│ updatedAt       │     │ createdAt       │     │ exampleSentence │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         │                      │                       │
         ▼                      ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ user_progress   │     │   exercises     │     │ user_vocabulary │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id              │     │ id              │     │ id              │
│ userId (FK)     │     │ lessonId (FK)   │     │ userId (FK)     │
│ lessonId (FK)   │     │ type (enum)     │     │ vocabularyId    │
│ completed       │     │ question        │     │ masteryLevel    │
│ score           │     │ correctAnswer   │     │ timesReviewed   │
│ timeSpent       │     │ options (JSON)  │     │ timesCorrect    │
│ completedAt     │     │ explanation     │     │ lastReviewedAt  │
│ createdAt       │     │ difficulty      │     │ nextReviewAt    │
└─────────────────┘     │ xpValue         │     │ createdAt       │
                        └─────────────────┘     └─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│  achievements   │     │user_achievements│
├─────────────────┤     ├─────────────────┤
│ id              │     │ id              │
│ name            │     │ userId (FK)     │
│ description     │     │ achievementId   │
│ iconUrl         │     │ unlockedAt      │
│ xpReward        │     │ createdAt       │
│ requirement     │     └─────────────────┘
│ createdAt       │
└─────────────────┘
```

### Exercise Types (Enum)
- `MULTIPLE_CHOICE` - Select the correct answer
- `FILL_BLANK` - Fill in the missing word
- `LISTENING` - Listen and select/type
- `SPEAKING` - Speak and verify
- `MATCHING` - Match pairs
- `TRANSLATION` - Translate sentences
- `WORD_ORDER` - Arrange words correctly
- `TYPING` - Type the answer

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

### Lessons
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/lessons` | List all lessons | Yes |
| GET | `/api/lessons/:id` | Get lesson details | Yes |
| GET | `/api/lessons/:id/vocabulary` | Get lesson vocabulary | Yes |
| GET | `/api/lessons/:id/exercises` | Get lesson exercises | Yes |
| POST | `/api/lessons/:id/exercises/:exerciseId/submit` | Submit answer | Yes |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update profile | Yes |
| GET | `/api/users/achievements` | Get achievements | Yes |
| GET | `/api/users/leaderboard` | Get leaderboard | Yes |

### Progress
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/progress` | Get user progress | Yes |
| POST | `/api/progress/update` | Update progress | Yes |
| GET | `/api/progress/stats` | Get statistics | Yes |

### Health
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/health` | Server health check | No |

---

## Lesson Structure (Minna No Nihongo)

Based on **Minna No Nihongo: Beginner 1** (Lessons 1-25)

### Unit 1: Basics (Lessons 1-5)
| Lesson | Title | Grammar Points |
|--------|-------|----------------|
| 1 | はじめまして (Nice to meet you) | ～は～です, ～じゃありません |
| 2 | これは何ですか (What is this?) | これ/それ/あれ, この/その/あの |
| 3 | ここは郵便局です (This is a post office) | ここ/そこ/あそこ, Location words |
| 4 | 今何時ですか (What time is it?) | Numbers, Time expressions |
| 5 | 京都へ行きます (Going to Kyoto) | ～へ行きます/来ます/帰ります |

### Unit 2: Daily Life (Lessons 6-10)
| Lesson | Title | Grammar Points |
|--------|-------|----------------|
| 6 | いっしょに行きませんか (Won't you go together?) | ～を～ます, ～ませんか |
| 7 | 何であげますか (How will you give it?) | あげます/もらいます/くれます |
| 8 | マリアさんはきれいです (Maria is beautiful) | い-adjectives, な-adjectives |
| 9 | 好きな食べ物は何ですか (What food do you like?) | 好き/嫌い/上手/下手 |
| 10 | あそこに男の人がいます (There's a man over there) | います/あります |

### Unit 3: Actions (Lessons 11-15)
| Lesson | Title | Grammar Points |
|--------|-------|----------------|
| 11 | りんごが四つあります (There are four apples) | Counters |
| 12 | 昨日は寒かったです (Yesterday was cold) | Past tense adjectives |
| 13 | 別々にお願いします (Separately, please) | ～たいです, ～ましょう |
| 14 | ちょっと待ってください (Please wait a moment) | て-form |
| 15 | 写真を撮ってもいいですか (May I take photos?) | ～てもいいですか |

### Unit 4: Descriptions (Lessons 16-20)
| Lesson | Title | Grammar Points |
|--------|-------|----------------|
| 16 | 使い方を教えてください (Please teach me how to use it) | ～て、～て connecting |
| 17 | どうしましたか (What happened?) | ～ないでください |
| 18 | 趣味は何ですか (What are your hobbies?) | Dictionary form, ことができます |
| 19 | 相撲を見たことがありますか (Have you seen sumo?) | ～たことがあります |
| 20 | 夏休みはどうでしたか (How was summer vacation?) | Plain form |

### Unit 5: Advanced Basics (Lessons 21-25)
| Lesson | Title | Grammar Points |
|--------|-------|----------------|
| 21 | どう思いますか (What do you think?) | ～と思います |
| 22 | どんな部屋がいいですか (What kind of room is good?) | Relative clauses |
| 23 | どうやって行きますか (How do you get there?) | ～とき, ～と |
| 24 | 手伝いましょうか (Shall I help?) | くれます/もらいます |
| 25 | いろいろお世話になりました (Thank you for everything) | ～たら, Review |

---

## Gamification Features

### XP System
- Correct answer: +10 XP
- Perfect lesson: +50 XP bonus
- Daily streak: +20 XP
- Achievement unlocked: +100 XP

### Hearts System
- Start with 5 hearts
- Lose 1 heart per wrong answer
- Hearts regenerate over time (1 per hour)
- Premium: Unlimited hearts

### Streak System
- Practice daily to maintain streak
- Streak freeze available (premium)
- Milestone rewards at 7, 30, 100, 365 days

### Achievements
- 🎯 First Steps - Complete first lesson
- 📚 Bookworm - Complete 10 lessons
- 🔥 On Fire - 7-day streak
- 💯 Perfectionist - 100% on a lesson
- 🎌 日本語上手 - Complete all 25 lessons

---

## Project Structure

```
jplingo/
├── frontend/                 # React Native app
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── screens/          # App screens
│   │   ├── navigation/       # Navigation config
│   │   ├── store/            # Redux store
│   │   ├── services/         # API services
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utilities
│   │   └── types/            # TypeScript types
│   └── package.json
│
├── backend/                  # Express API server
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utilities
│   │   └── index.ts          # Entry point
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── package.json
│
├── content/                  # Learning content
│   ├── lessons/              # Lesson JSON files
│   ├── vocabulary/           # Vocabulary data
│   └── exercises/            # Exercise templates
│
├── docs/                     # Documentation
│   ├── api.md
│   └── deployment.md
│
├── jplingo.md               # This file
├── debug.md                 # Debug log
└── setup.sh                 # Setup script
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Setup

```bash
# Clone and enter directory
cd jplingo

# Run setup script
./setup.sh

# Or manually:

# 1. Start PostgreSQL
brew services start postgresql@14

# 2. Create database
createdb jplingo_dev

# 3. Setup backend
cd backend
npm install
npm run migrate
npm run dev

# 4. Setup frontend (in another terminal)
cd frontend
npm install
npx react-native start
```

### Verify Installation

```bash
# Check server health
curl http://localhost:3000/health
# Expected: {"status":"OK"}
```

---

## Development Roadmap

### Phase 1: MVP ✅
- [x] Project planning
- [x] Backend structure
- [x] Database schema
- [x] API endpoints (skeleton)
- [x] Server running

### Phase 2: Core Features (In Progress)
- [ ] User authentication (bcrypt + JWT)
- [ ] Lesson CRUD with Prisma
- [ ] Exercise engine
- [ ] Progress tracking

### Phase 3: Content
- [ ] Seed lessons 1-5
- [ ] Add vocabulary data
- [ ] Create exercises
- [ ] Audio recordings

### Phase 4: Frontend
- [ ] Initialize React Native
- [ ] Authentication screens
- [ ] Lesson list screen
- [ ] Exercise screens
- [ ] Progress dashboard

### Phase 5: Gamification
- [ ] XP system
- [ ] Hearts system
- [ ] Streaks
- [ ] Achievements
- [ ] Leaderboard

### Phase 6: Polish
- [ ] UI/UX improvements
- [ ] Sound effects
- [ ] Animations
- [ ] Offline mode
- [ ] Push notifications

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - See LICENSE file for details

---

## Acknowledgments

- **Minna No Nihongo** by 3A Corporation for the curriculum structure
- **Duolingo** for gamification inspiration
- Japanese language learning community

---

*がんばって！(Good luck!)*
