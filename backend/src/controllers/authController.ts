import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: { id: '1', username: 'testuser', email: req.body.email },
          token: 'sample_token',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: { id: '1', username: 'testuser', email: req.body.email },
          token: 'sample_token',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({
        success: true,
        data: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          level: 1,
          xp: 0,
          streak: 0,
          hearts: 5,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
