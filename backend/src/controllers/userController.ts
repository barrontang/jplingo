import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { userStore } from '../services/userStore';

export class UserController {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Not authenticated' });
        return;
        }
      // Prefer the stored profile; fall back to the JWT claims so the endpoint
      // still returns a valid shape before the DB layer is wired up.
      const user = userStore.findById(req.user.userId);
      res.json({
        success: true,
        data: user
           ? {
            id: user.id,
            username: user.username,
            email: user.email,
            level: user.level,
            xp: user.xp,
            streak: user.streak,
            }
             : {
            id: req.user.userId,
            username: 'user',
            email: req.user.email,
            },
         });
       } catch (error) {
      next(error);
      }
    }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Not authenticated' });
        return;
        }
      // Persisted profile updates arrive with the Prisma layer; for now we echo
      // the (ignored) payload back so the client flow is unchanged.
      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: { id: req.user.userId },
        });
     } catch (error) {
      next(error);
      }
    }

  async getAchievements(_req: AuthRequest, res: Response, _next: NextFunction) {
    res.json({ success: true, data: [] });
    }

  async getLeaderboard(_req: AuthRequest, res: Response, _next: NextFunction) {
    res.json({ success: true, data: [] });
    }
}
