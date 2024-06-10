import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

import { LoggerMessage, LoggerMetadata, LoggerTransport } from './transport';

const levels = {
  error: 0,
  info: 1,
  warn: 2,
  debug: 3,
};

@Injectable()
export class LoggerService {
  private instance: winston.Logger;

  constructor(private readonly transport: LoggerTransport) {
    const transportsList = [this.transport.createConsoleTransport()];

    this.instance = winston.createLogger({
      levels,
      handleExceptions: true,
      handleRejections: true,
      transports: transportsList,
      defaultMeta: {
        serviceName: 'DX',
        context: 'HTTP',
      },
    });
  }

  info(message: LoggerMessage, metadata?: LoggerMetadata) {
    this.instance.info(message as any, metadata);
  }

  error(message: LoggerMessage, metadata?: LoggerMetadata) {
    this.instance.error(message as any, metadata);
  }
}
