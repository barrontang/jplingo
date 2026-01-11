#!/bin/bash

# JPLingo Setup Script
# This script automates the initial setup of JPLingo

set -e  # Exit on error

echo "🎌 Welcome to JPLingo Setup!"
echo "================================"
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi
echo "✅ Node.js $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm $(npm --version)"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. You'll need it for the backend."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ PostgreSQL $(psql --version | awk '{print $3}')"
fi

echo ""
echo "🔧 Setting up backend..."
echo "================================"

cd backend

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your database credentials"
fi

# Generate Prisma client
echo "🔨 Generating Prisma client..."
npm run prisma:generate

echo ""
echo "📱 Setting up frontend..."
echo "================================"

cd ../frontend

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
fi

# Check if React Native project is initialized
if [ ! -d "ios" ] && [ ! -d "android" ]; then
    echo ""
    echo "⚠️  React Native project not fully initialized"
    echo "The frontend structure is ready, but native code needs setup."
    echo ""
    echo "To complete React Native setup, you have two options:"
    echo ""
    echo "Option 1: Initialize a new RN project and merge our code"
    echo "  npx react-native@latest init JPLingoTemp --template react-native-template-typescript"
    echo "  # Then copy ios/ and android/ folders to frontend/"
    echo ""
    echo "Option 2: Use Expo (simpler, recommended for quick start)"
    echo "  npx create-expo-app@latest --template"
    echo ""
fi

cd ..

echo ""
echo "================================"
echo "✨ Setup complete!"
echo "================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Configure your database:"
echo "   Edit backend/.env with your PostgreSQL credentials"
echo ""
echo "2. Run database migrations:"
echo "   cd backend && npm run migrate"
echo ""
echo "3. (Optional) Seed initial data:"
echo "   npm run seed"
echo ""
echo "4. Start the backend:"
echo "   npm run dev"
echo ""
echo "5. For the frontend, you need to complete React Native setup:"
echo "   See: docs/SETUP.md for detailed instructions"
echo ""
echo "Or use Docker:"
echo "   docker-compose up -d"
echo ""
echo "📚 Read the documentation:"
echo "   - Setup guide: docs/SETUP.md"
echo "   - API docs: docs/api.md"
echo "   - Contributing: docs/CONTRIBUTING.md"
echo ""
echo "頑張ってください！ (Good luck!)"
