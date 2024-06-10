import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger';

@Catch(BadRequestException)
export class ValidatorExceptionFilter implements ExceptionFilter {
  constructor(readonly logger: LoggerService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getResponse<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error({ request, statusCode: 422 });

    response.status(422).json({
      status: 422,
      error: HttpStatus[422],
      code: 'PROPERTY_INVALID',
      message: (exception.getResponse() as any).message,
    });
  }
}
