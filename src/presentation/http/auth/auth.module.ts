import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from '../../shared';
import { AuthController } from './auth.controller';
import { GoogleStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (jwtConf: ConfigType<typeof jwtConfig>) => ({
        global: true,
        secret: jwtConf.secret,
        signOptions: { expiresIn: jwtConf.expiresIn },
      }),
      inject: [jwtConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
