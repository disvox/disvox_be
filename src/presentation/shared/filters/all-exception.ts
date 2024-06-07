import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Exception } from '@/shared';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception);

    if (exception instanceof Exception) {
      response.status(500).json({
        status: 500,
        error: HttpStatus[500],
        code: exception.code,
        message: exception.message,
      });
    } else {
      response.status(500).json({
        status: 500,
        error: HttpStatus[500],
        code: 'UNCAUGHT_EXCEPTION',
        message: exception.message,
      });
    }
  }
}
