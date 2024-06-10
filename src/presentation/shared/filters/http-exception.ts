import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { HttpException } from '@/shared';
import { LoggerService } from '../logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error({ request, statusCode: exception.statusCode });

    response.status(exception.statusCode).json({
      status: exception.statusCode,
      error: HttpStatus[exception.statusCode],
      code: exception.code,
      message: exception.message,
    });
  }
}
