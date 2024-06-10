import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TJwtConfig, jwtConfig } from '../../shared';
import { AuthController } from './controller';
import { GoogleStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (jwtConf: TJwtConfig) => ({
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
