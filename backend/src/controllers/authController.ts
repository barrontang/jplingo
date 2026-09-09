import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middleware/auth';
import { userStore } from '../services/userStore';

const SECRET = () => process.env.JWT_SECRET;
const EXPIRES_IN = () => process.env.JWT_EXPIRES_IN || '7d';
const requireSecret = (): string => {
  const secret = SECRET();
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return secret;
};

interface JwtPayload {
  userId: string;
  email: string;
}

const signToken = (user: { id: string; email: string }): string =>
   jwt.sign(
     { userId: user.id, email: user.email } as JwtPayload,
     requireSecret(),
     // Newer @types/jsonwebtoken narrows expiresIn; cast keeps it compile-clean.
     { expiresIn: EXPIRES_IN() } as unknown as { expiresIn: number },
   );

const publicUser = (u: {
  id: string;
  username: string;
  email: string;
  level: number;
  xp: number;
  streak: number;
  hearts: number;
}) => ({ id: u.id, username: u.username, email: u.email });

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body || {};
      if (!username || !email || !password) {
        res.status(400).json({
          success: false,
          error: 'username, email and password are required',
         });
        return;
       }
      const user = await userStore.register(String(username), String(email), String(password));
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { user: publicUser(user), token: signToken(user) },
       });
     } catch (error) {
      if (error instanceof Error && error.message.includes('already')) {
        res.status(409).json({ success: false, error: error.message });
        return;
       }
      next(error);
     }
   }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        res.status(400).json({ success: false, error: 'email and password are required' });
        return;
       }
      const user = await userStore.findByEmail(String(email));
      if (!user || !(await userStore.verifyPassword(user, String(password)))) {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
        return;
       }
      res.json({
        success: true,
        message: 'Login successful',
        data: { user: publicUser(user), token: signToken(user) },
       });
     } catch (error) {
      next(error);
     }
   }

  async logout(_req: Request, res: Response, _next: NextFunction) {
    // State demo: tokens are stateless JWTs; clients discard them on logout.
    res.json({ success: true, message: 'Logout successful' });
   }

  async getCurrentUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Not authenticated' });
        return;
       }
      const user = userStore.findById(req.user.userId);
      if (!user) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
       }
      res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          level: user.level,
          xp: user.xp,
          streak: user.streak,
          hearts: user.hearts,
         },
       });
     } catch (error) {
      next(error);
     }
   }
}

