import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';

export class ProgressController {
  async getUserProgress(_req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProgress(_req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        message: 'Progress updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getStats(_req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        data: {
          totalXP: 0,
          lessonsCompleted: 0,
          currentStreak: 0,
          longestStreak: 0,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
