import { Module } from '@nestjs/common';

import { LoggerService } from './service';
import { LoggerTransport } from './transport';

@Module({
  providers: [LoggerService, LoggerTransport],
  exports: [LoggerService],
})
export class LoggerModule {}
