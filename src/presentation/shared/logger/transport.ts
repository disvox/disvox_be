import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import * as chalk from 'chalk';
import * as winston from 'winston';
import { Request } from 'express';

import { calculateResponseTime, getSourceIp } from './util';

export type LoggerMessage = {
  request: Request;
  statusCode: number;
};

export type LoggerMetadata = {
  context?: string;
};

type ConsoleTransportData = {
  serviceName?: string;
  timestamp: string;
  level: string;
  message: LoggerMessage;
} & LoggerMetadata;

@Injectable()
export class LoggerTransport {
  constructor(private readonly cls: ClsService) {}

  createConsoleTransport() {
    const nestLikeColorScheme: Record<string, (text: string) => string> = {
      error: chalk.red,
      info: chalk.cyan,
      warn: chalk.yellow,
      debug: chalk.magentaBright,
      log: chalk.green,
    };

    const winstonTimestampFormat = winston.format.timestamp({
      format: 'MM/DD/YYYY, h:mm:ss A',
    });

    const winstonPrintFormat = winston.format.printf(
      ({
        serviceName,
        timestamp,
        level,
        message,
        context,
      }: ConsoleTransportData) => {
        const { request, statusCode } = message;

        // calculate the response time
        const responseTime = calculateResponseTime(
          this.cls.get().startAt,
          process.hrtime.bigint(),
        );

        let color = nestLikeColorScheme[level];
        if (level === 'error' && statusCode < 500) color = chalk.hsl(5, 80, 50); // orange color

        const formattedPid = color(
          `${('[' + serviceName + ']').padEnd(6)} ${process.pid.toString()}  -`,
        );
        const formattedLogLevel = color(level.toUpperCase().padStart(7));
        const formattedContext = chalk.yellow(`[${context}]`);
        const formattedMethod = color(request.method.padStart(7));
        const formattedUrl = color(request.originalUrl);
        const formattedStatusCode = color(statusCode.toString().padStart(4));
        const formattedIp = chalk.blueBright(`- IP: ${getSourceIp(request)}`);
        const formattedResponseTime = responseTime
          ? chalk.yellow('+' + responseTime + 'ms')
          : '';

        return `${formattedPid} ${timestamp} ${formattedLogLevel} ${formattedContext} ${formattedMethod} ${formattedUrl} ${formattedStatusCode} ${formattedIp} ${formattedResponseTime}`;
      },
    );

    return new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winstonTimestampFormat,
        winstonPrintFormat,
      ),
    });
  }
}
