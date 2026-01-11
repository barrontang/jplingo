import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import lessonRoutes from './routes/lessonRoutes';
import userRoutes from './routes/userRoutes';
import progressRoutes from './routes/progressRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { lessonService } from './services/lessonService';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to JPLingo API',
    version: '1.0.0',
    status: 'running',
  });
});

app.use('/auth', authRoutes);
app.use('/lessons', lessonRoutes);
app.use('/users', userRoutes);
app.use('/progress', progressRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

// Start server with lesson data loading
const startServer = async () => {
  try {
    // Load all lessons on startup
    await lessonService.loadLessons();
    
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
