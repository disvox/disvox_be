import { ConfigType, registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN ?? '1000',
}));

export type TJwtConfig = ConfigType<typeof jwtConfig>;
