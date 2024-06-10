import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      guard: {
        mount: true,
      },
    }),
  ],
})
export class ContextModule {}
