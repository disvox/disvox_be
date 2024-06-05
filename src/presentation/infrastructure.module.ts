import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';

import {
  DRIZZLE_TOKEN,
  PERMISSION_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
  PermissionRepository,
  UserRepository,
  RoleRepository,
  schema,
  ROLE_REPOSITORY_TOKEN,
} from '@/infrastructure';
import { databaseConfig } from './shared/configs';

@Global()
@Module({
  imports: [
    DrizzleMySqlModule.registerAsync({
      tag: DRIZZLE_TOKEN,
      useFactory: (databaseConf: ConfigType<typeof databaseConfig>) => ({
        mysql: {
          connection: 'pool',
          config: {
            uri: databaseConf.url,
          },
        },
        config: {
          mode: 'default',
          schema: { ...schema },
        },
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
  providers: [
    {
      provide: PERMISSION_REPOSITORY_TOKEN,
      useClass: PermissionRepository,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: ROLE_REPOSITORY_TOKEN,
      useClass: RoleRepository,
    },
  ],
  exports: [
    PERMISSION_REPOSITORY_TOKEN,
    USER_REPOSITORY_TOKEN,
    ROLE_REPOSITORY_TOKEN,
  ],
})
export class InfrastructureModule {}
