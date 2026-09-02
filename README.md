# 🇯🇵 JPLingo - Japanese Learning App

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.73-blue?logo=react" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-54-black?logo=expo" alt="Expo">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-Express-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

A modern Japanese language learning application inspired by Duolingo, organized around the **JLPT N5 → N1 roadmap**. Today the app ships **40 original lessons** (self-written grammar explanations, vocabulary, and quizzes) spanning beginner through advanced study. Lessons **1-25** cover the elementary/beginner grammar generally associated with **N5 and N4**, and lessons **26-40** add original **N3, N2, and N1** roadmap content for intermediate and advanced practice.

## ✨ Features

- 🗾 **JLPT N5 → N1 Roadmap** - Level selector shows playable lesson paths and goals/topics for every level from N5 through N1
- 📚 **40 Original Lessons** - Self-written grammar points, vocabulary, and quizzes covering N5-N1 roadmap study (see [Content Attribution](#-content-attribution))
- 🎯 **Interactive Quizzes** - 5 questions per lesson (vocabulary + grammar), shuffled options and wrong-answer pools
- 🔀 **Randomized Questions** - Different question order and distractors each attempt
- ✅ **Instant Feedback** - See correct/incorrect answers immediately, with explanations
- ❤️ **Hearts** - 5 hearts per session; a wrong answer costs a heart (never below 0). Starting a quiz with 0 hearts is blocked, with a one-tap local "Refill Hearts" reset
- ⭐ **XP & Daily Quest** - Earn XP for correct answers and track a session "daily quest" progress bar toward an XP goal
- 🔥 **Day Streak** - Increments once per session, the first time any lesson is passed (≥70%)
- 🔓 **Progressive Unlocking** - Lessons unlock one at a time as the previous lesson in the path is passed; completed lessons are tracked and shown with a checkmark
- 📊 **Score Tracking** - Track your progress with detailed pass/fail results
- 🌐 **Cross-Platform** - Runs on Web, iOS, and Android via Expo/React Native primitives

## 🗾 JLPT Roadmap

| Level | Status | Goal | Example topics |
|-------|--------|------|-----------------|
| N5 | ✅ Available (lessons 1-15) | Read basic hiragana/katakana and build simple sentences | は/です sentences, basic particles, everyday vocabulary |
| N4 | ✅ Available (lessons 16-25) | Handle everyday conversations with more natural grammar | て-form requests, giving & receiving, past/plain forms |
| N3 | ✅ Available (lessons 26-30) | Follow everyday Japanese at a natural pace | Conditional forms, passive/causative basics, preparation patterns |
| N2 | ✅ Available (lessons 31-35) | Understand news, workplace Japanese, abstract topics | Formal/keigo basics, reports, complex grammar |
| N1 | ✅ Available (lessons 36-40) | Understand nuanced, academic, literary Japanese | Advanced nuance, formal writing, business/essay expressions |

The lesson → JLPT level mapping (lessons 1-15 → N5, 16-25 → N4, 26-30 → N3, 31-35 → N2, 36-40 → N1) is a **defensible approximation**, not an official JLPT certification — see [Content Attribution](#-content-attribution).

## 📖 Lesson Content (N5-N1, available today)

| Lessons | JLPT Level | Topics Covered |
|---------|-----------|----------------|
| 1-5 | N5 | Self-introduction, demonstratives (これ/それ/あれ), location words, time expressions, transportation |
| 6-10 | N5 | Verbs (食べます/飲みます), objects, giving/receiving, adjectives (い/な), existence (います/あります) |
| 11-15 | N5 | Counters, past tense, comparisons, desire (たい form), te-form |
| 16-20 | N4 | Connecting sentences, prohibitions, potential form, experience, plain form |
| 21-25 | N4 | Quotations, giving advice, conditionals, causative, passive form |
| 26-30 | N3 | なら/ば/たら conditionals, passive, causative, ように, ておく |
| 31-35 | N2 | Honorific and humble speech, forecasts/reports, polite refusal, べきだ, に違いない |
| 36-40 | N1 | ものの, とはいえ, にもかかわらず, ざるをえない, というものだ |

## 🎮 Game Mechanics

- **Hearts** start at 5 each session. Every incorrect quiz answer costs one heart (floor of 0). If hearts reach 0, the lesson screen and quiz results screen swap the "Start Quiz"/"Try Again" button for a **Refill Hearts** action — a clear, deterministic local reset back to 5 (no hidden timers or network calls).
- **XP** is awarded (+20) for each correct answer and shown in the header/stat chips.
- **Daily Quest** is a session-scoped XP goal (50 XP) with a progress bar on the home screen; it fills as you answer correctly and shows a "Complete" state once reached.
- **Streak** increments once per app session — the first time you pass a lesson (score ≥ 70%) — modeling a "practiced today" day streak without needing persistence or a clock.
- **Progressive unlocking**: lesson 1 is always unlocked; every other lesson unlocks once the lesson before it has been passed. Passed lessons are tracked in app state and shown with a ✓ badge on the lesson grid.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (for mobile development)

### Frontend (React Native / Expo)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npx expo start --web

# Or for mobile
npx expo start
```

The app will be available at `http://localhost:19007`

### Backend (Node.js / Express)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

The API will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
jplingo/
├── frontend/                 # React Native Expo app
│   ├── App.tsx              # Main app with quiz system
│   ├── src/
│   │   ├── screens/         # Screen components
│   │   ├── navigation/      # Navigation setup
│   │   ├── services/        # API services
│   │   ├── store/           # Redux store
│   │   └── types/           # TypeScript types
│   └── package.json
│
├── backend/                  # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── data/            # Lesson JSON data
│   │   └── index.ts         # Server entry point
│   ├── prisma/              # Database schema
│   └── package.json
│
├── content/                  # Additional lesson content
├── database/                 # Database initialization
├── docs/                     # Documentation
└── docker-compose.yml        # Docker setup
```

## 🎮 How to Use

1. **Pick a JLPT Level** - Use the N5-N1 roadmap tabs on the home screen; every level now has playable lessons and roadmap goals
2. **Select a Lesson** - Choose an unlocked lesson from the level's lesson grid
3. **Learn Content** - Review grammar points and vocabulary
4. **Start Quiz** - Click "Start Quiz" to begin (requires at least 1 heart)
5. **Answer Questions** - Select the correct answer from 4 options; wrong answers cost a heart
6. **Get Feedback** - See instant feedback with explanations and XP earned
7. **View Results** - Check your final score; passing (≥70%) marks the lesson complete, unlocks the next lesson, and may update your streak

## 🛠️ Tech Stack

### Frontend
- **React Native** 0.73 - Cross-platform mobile framework
- **Expo** 54 - Development and build tooling
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Screen navigation
- **Redux Toolkit** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Database ORM
- **PostgreSQL** - Database (optional)

## 📱 Screenshots

| Home Screen | Lesson View | Quiz |
|-------------|-------------|------|
| 25 lesson grid | Grammar & vocabulary | Multiple choice questions |

## 🧪 Testing

```bash
# Run quiz system tests
cd frontend
node test-quiz-system.js

# Expected output: 375/375 tests passed
```

## 🐳 Docker Setup

```bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lessons` | Get all lessons |
| GET | `/api/lessons?level=N5` | Get lessons filtered by JLPT level (`N5`, `N4`, `N3`, `N2`, or `N1`, case-insensitive). Returns `400` for any other value |
| GET | `/api/lessons/:id` | Get lesson by ID |
| GET | `/api/lessons/:id/vocabulary` | Get vocabulary for a lesson |
| GET | `/api/lessons/:id/exercises` | Get exercises for a lesson |
| POST | `/api/progress` | Save user progress |

Every lesson response now includes a `jlptLevel` field (`"N5"`, `"N4"`, `"N3"`, `"N2"`, or `"N1"` depending on the bundled lesson). Level filters return the matching bundled lessons for that roadmap stage, and only unrecognized level strings return `400`.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Content Attribution

All grammar explanations, example sentences, vocabulary lists, and quiz questions in this repository are **original content written for this project**. No text, audio, or datasets have been copied from Minna No Nihongo, other textbooks, or third-party repositories.

- The lesson *topic sequence* (e.g. covering は/です before te-form, then potential/causative forms, then keigo and advanced written nuance) is loosely **inspired by** common Japanese curricula and roadmap expectations — this is standard pedagogical ordering, not reproduced text.
- Lessons 1-25 remain loosely inspired by the well-known Minna No Nihongo beginner progression, while lessons 26-40 are original intermediate/advanced extensions written specifically for this app.
- The lesson → JLPT level mapping (lessons 1-15 → N5, 16-25 → N4, 26-30 → N3, 31-35 → N2, 36-40 → N1) is a **defensible in-app approximation** created for this roadmap. It is not an official JLPT syllabus mapping, and passing these lessons does not certify JLPT readiness.

## 🙏 Acknowledgments

- **Minna No Nihongo** - Inspiration for beginner lesson topic ordering (content itself is original, not reproduced)
- **Duolingo** - UI/UX inspiration
- **React Native Community** - Amazing tools and libraries

---

<p align="center">
  Made with ❤️ for Japanese learners everywhere
</p>
