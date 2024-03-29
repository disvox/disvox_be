import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Prisma } from '@/prisma';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string | undefined;

    console.log(exception);

    switch (exception['code']) {
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        error = 'Not Found';
        message = exception['meta']['cause'];
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode,
      error,
      message,
    });
  }
}
