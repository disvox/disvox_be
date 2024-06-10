import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { IAuthPayload } from '@/application';
import { TJwtConfig, jwtConfig } from '../../../shared';
import { ACCESS_TOKEN_KEY } from '../constants';
import { ClsService } from 'nestjs-cls';

const cookieExtractor = (req: Request) => {
  return req.signedCookies[ACCESS_TOKEN_KEY];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY) private jwtConf: TJwtConfig,
    private readonly cls: ClsService,
  ) {
    super({
      secretOrKey: jwtConf.secret,
      jwtFromRequest: cookieExtractor,
    });
  }

  async validate(payload: IAuthPayload) {
    this.cls.set('user.id', payload.userId);
    return true;
  }
}
