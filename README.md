# 🇯🇵 JPLingo - Japanese Learning App

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.73-blue?logo=react" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-54-black?logo=expo" alt="Expo">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-Express-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

A modern Japanese language learning application inspired by Duolingo, featuring **25 lessons** based on the popular **Minna No Nihongo** textbook series. Learn Japanese through interactive quizzes covering vocabulary and grammar.

## ✨ Features

- 📚 **25 Complete Lessons** - Based on Minna No Nihongo curriculum
- 🎯 **Interactive Quizzes** - 5 questions per lesson (3 vocabulary + 2 grammar)
- 🔀 **Randomized Questions** - Different question order each time
- ✅ **Instant Feedback** - See correct/incorrect answers immediately
- 📊 **Score Tracking** - Track your progress with detailed results
- 🌐 **Cross-Platform** - Runs on Web, iOS, and Android via Expo

## 📖 Lesson Content

| Lessons | Topics Covered |
|---------|----------------|
| 1-5 | Self-introduction, demonstratives (これ/それ/あれ), location words, time expressions, transportation |
| 6-10 | Verbs (食べます/飲みます), objects, giving/receiving, adjectives (い/な), existence (います/あります) |
| 11-15 | Counters, past tense, comparisons, desire (たい form), te-form |
| 16-20 | Connecting sentences, prohibitions, potential form, experience, plain form |
| 21-25 | Quotations, giving advice, conditionals, causative, passive form |

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

1. **Select a Lesson** - Choose from 25 available lessons on the home screen
2. **Learn Content** - Review grammar points and vocabulary
3. **Start Quiz** - Click "Start Quiz" to begin
4. **Answer Questions** - Select the correct answer from 4 options
5. **Get Feedback** - See instant feedback with explanations
6. **View Results** - Check your final score and review answers

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
| GET | `/api/lessons/:id` | Get lesson by ID |
| GET | `/api/lessons/:id/quiz` | Get quiz for lesson |
| POST | `/api/progress` | Save user progress |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Minna No Nihongo** - Lesson content structure inspiration
- **Duolingo** - UI/UX inspiration
- **React Native Community** - Amazing tools and libraries

---

<p align="center">
  Made with ❤️ for Japanese learners everywhere
</p>
