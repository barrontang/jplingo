# Next Steps After Setup

## ✅ What's Done

- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed  
- ✅ Environment files created
- ✅ Prisma client generated

## 🚀 Quick Start - Backend Only (Recommended First)

Let's get the backend API running first:

### 1. Set up PostgreSQL Database

**Option A: Using Docker (Easiest)**
```bash
docker-compose up -d postgres redis
```

**Option B: Local PostgreSQL**
```bash
# macOS
brew services start postgresql@14
createdb jplingo_dev

# Linux
sudo systemctl start postgresql
sudo -u postgres createdb jplingo_dev
```

### 2. Configure Database Connection

Edit `backend/.env`:
```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/jplingo_dev
```

For Docker setup, use:
```env
DATABASE_URL=postgresql://jplingo:jplingo_dev_password@localhost:5432/jplingo_dev
```

### 3. Run Database Migrations

```bash
cd backend
npm run migrate
```

### 4. (Optional) Seed Sample Data

```bash
npm run seed
```

### 5. Start Backend Server

```bash
npm run dev
```

Backend should now be running at: **http://localhost:3000**

Test it:
```bash
curl http://localhost:3000/health
# Should return: {"status":"OK"}
```

## 📱 Frontend Setup - Two Options

### Option 1: Use Expo (Recommended for Quick Start)

Expo is easier to set up and doesn't require Xcode/Android Studio:

```bash
cd ..
npx create-expo-app JPLingoApp --template blank-typescript
cd JPLingoApp

# Copy our frontend code
cp -r ../frontend/src ./
cp ../frontend/App.tsx ./App.tsx
cp ../frontend/package.json ./package-expo.json

# Install our dependencies
npm install @reduxjs/toolkit react-redux axios @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs

# Install Expo-specific navigation dependencies
npx expo install react-native-screens react-native-safe-area-context

# Start Expo
npx expo start
```

Then scan the QR code with the Expo Go app on your phone!

### Option 2: Full React Native (For Production)

If you want the full React Native setup with native code:

```bash
# Create a new React Native project
npx react-native@latest init JPLingoNative --template react-native-template-typescript

# Copy our code to it
cp -r frontend/src JPLingoNative/
cp frontend/App.tsx JPLingoNative/
cp frontend/package.json JPLingoNative/package-frontend.json

cd JPLingoNative
npm install

# iOS (macOS only)
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

## 🐳 Easiest Option: Use Docker for Everything

If you have Docker installed:

```bash
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- Redis (port 6379)
- Backend API (port 3000)
- PgAdmin (port 5050) - Database GUI

Access:
- API: http://localhost:3000
- PgAdmin: http://localhost:5050 (login: admin@jplingo.com / admin)

## 📊 Verify Everything Works

### Test Backend API

```bash
# Health check
curl http://localhost:3000/health

# Get lessons (after seeding)
curl http://localhost:3000/lessons
```

### Check Database with Prisma Studio

```bash
cd backend
npm run prisma:studio
```

Opens at: http://localhost:5555

## 🎯 Recommended Path for Development

1. **Start with Backend** (Done above)
   - Get API running
   - Test endpoints with curl/Postman
   - Verify database works

2. **Use Expo for Frontend** (Quick iteration)
   - Fast refresh
   - Test on real device easily
   - No Xcode/Android Studio needed

3. **Later: Full React Native** (For production)
   - When you need native modules
   - For App Store submission

## 📚 Documentation

- **API Endpoints**: See `docs/api.md`
- **Setup Guide**: See `docs/SETUP.md`
- **Project Structure**: See `docs/PROJECT_STRUCTURE.md`
- **Quick Reference**: See `QUICKSTART.md`

## 🐛 Common Issues

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
pg_isready

# Check connection string in backend/.env
# Make sure database exists
```

### "Port 3000 already in use"
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
```

### Prisma errors
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
```

## 💡 Development Workflow

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend (Expo)
cd JPLingoApp  # or your Expo project
npx expo start

# Terminal 3: Database GUI (optional)
cd backend
npm run prisma:studio
```

## 🎓 Next: Add Your First Lesson

Once everything is running, you can:

1. Check existing content: `content/lessons/lesson-1.json`
2. Add more lessons following the same format
3. Run seed script to populate database
4. Test in the app!

---

**Need Help?**
- Read `docs/SETUP.md` for detailed setup
- Check `QUICKSTART.md` for quick commands
- Review `docs/api.md` for API reference

頑張ってください！ (Good luck!) 🚀
