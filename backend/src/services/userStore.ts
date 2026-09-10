import crypto from 'crypto';
import bcrypt from 'bcryptjs';

/**
 * In-memory user store used as a demo fallback until the PostgreSQL/Prisma
 * layer is wired up (see prisma/schema.prisma). It is intentionally simple and
 * process-local: data does not survive a server restart.
 *
 * Replace the methods below with Prisma-backed calls when the DB layer lands;
 * AuthController only depends on this interface, so no other code changes.
 */
export interface StoredUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  level: number;
  xp: number;
  streak: number;
  hearts: number;
}

const users = new Map<string, StoredUser>();

export class UserStore {
  /** Create a new user, failing if the email or username is taken. */
  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<StoredUser> {
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUser = username.trim();

    for (const u of users.values()) {
      if (u.email === normalizedEmail) {
        throw new Error('Email already registered');
      }
      if (u.username === normalizedUser) {
        throw new Error('Username already taken');
      }
    }

    const user: StoredUser = {
      id: crypto.randomUUID(),
      username: normalizedUser,
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 10),
      level: 1,
      xp: 0,
      streak: 0,
      hearts: 5,
    };

    users.set(user.id, user);
    return user;
  }

  async findByEmail(email: string): Promise<StoredUser | undefined> {
    const normalized = email.toLowerCase().trim();
    for (const u of users.values()) {
      if (u.email === normalized) return u;
    }
    return undefined;
  }

  findById(id: string): StoredUser | undefined {
    return users.get(id);
  }

  async verifyPassword(user: StoredUser, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}

export const userStore = new UserStore();
