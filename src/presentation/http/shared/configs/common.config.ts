import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.NODE_PORT, 10),
}));
