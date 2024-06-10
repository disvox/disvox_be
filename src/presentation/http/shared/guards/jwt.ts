import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { HttpException } from '@/shared';
import { ExceptionCode } from '@/application';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new HttpException({
        code: ExceptionCode.ActionRequireAuthorize,
        statusCode: 401,
        message: 'You must log in to do this action',
      });
    }
    return user;
  }
}
