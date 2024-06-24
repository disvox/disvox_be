import { Global, Module } from '@nestjs/common';
import { DrizzleMySqlModule } from '@knaadh/nestjs-drizzle-mysql2';

import {
  DRIZZLE_TOKEN,
  PERMISSION_REPOSITORY_TOKEN,
  ROLE_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
  SERVER_REPOSITORY_TOKEN,
  PermissionRepository,
  RoleRepository,
  UserRepository,
  ServerRepository,
  schema,
} from '@/infrastructure';
import { TDatabaseConfig, databaseConfig } from './shared/configs';

@Global()
@Module({
  imports: [
    DrizzleMySqlModule.registerAsync({
      tag: DRIZZLE_TOKEN,
      useFactory: (databaseConf: TDatabaseConfig) => ({
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
      provide: ROLE_REPOSITORY_TOKEN,
      useClass: RoleRepository,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: SERVER_REPOSITORY_TOKEN,
      useClass: ServerRepository,
    },
  ],
  exports: [
    PERMISSION_REPOSITORY_TOKEN,
    ROLE_REPOSITORY_TOKEN,
    USER_REPOSITORY_TOKEN,
    SERVER_REPOSITORY_TOKEN,
  ],
})
export class InfrastructureModule {}
