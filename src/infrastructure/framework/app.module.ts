import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { commonConfig, googleConfig, jwtConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [commonConfig, jwtConfig, googleConfig],
      cache: true,
      expandVariables: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
