import { registerAs, ConfigType } from '@nestjs/config';
import { CookieOptions } from 'express';

export const cookieConfig = registerAs('cookie', () => ({
  secret: process.env.COOKIE_SECRET,
  options: {
    maxAge:
      parseInt(process.env.COOKIE_MAX_AGE as string) ||
      30 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    httpOnly: true,
    signed: true,
  } satisfies CookieOptions,
}));

export type TCookieConfig = ConfigType<typeof cookieConfig>;
