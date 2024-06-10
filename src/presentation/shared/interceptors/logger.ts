import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

import { LoggerService } from '../logger/service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { statusCode } = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        this.logger.info({ request, statusCode });
      }),
    );
  }
}
