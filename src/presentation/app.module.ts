import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { AuthModule } from './http/auth/auth.module';
import { commonConfig, googleConfig, jwtConfig } from './shared';
import { PermissionModule, AuthModule } from './http';
import { PrismaService } from '@/infrastructure';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [commonConfig, jwtConfig, googleConfig],
      cache: true,
      expandVariables: true,
    }),
    PermissionModule,
    AuthModule,
    {
      module: PrismaService,
      providers: [PrismaService],
      exports: [PrismaService],
      global: true,
    },
  ],
})
export class AppModule {}
