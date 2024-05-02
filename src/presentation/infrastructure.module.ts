import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';

import {
  DRIZZLE_TOKEN,
  PERMISSION_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
  PermissionRepository,
  UserRepository,
  schema,
} from '@/infrastructure';
import { databaseConfig } from './shared/configs';

@Global()
@Module({
  imports: [
    DrizzlePGModule.registerAsync({
      tag: DRIZZLE_TOKEN,
      useFactory: (databaseConf: ConfigType<typeof databaseConfig>) => ({
        pg: {
          connection: 'pool',
          config: {
            connectionString: databaseConf.url,
          },
        },
        config: { schema: { ...schema } },
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
  ],
  exports: [PERMISSION_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN],
})
export class InfrastructureModule {}
