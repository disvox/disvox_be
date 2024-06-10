import { ConfigType, registerAs } from '@nestjs/config';

export const commonConfig = registerAs('common', () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.NODE_PORT ?? '3000', 10),
}));

export type TCommonConfig = ConfigType<typeof commonConfig>;
