import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { jwtConfig } from '../../../shared';
import { IAuthPayload } from '@/application';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY) private jwtConf: ConfigType<typeof jwtConfig>,
  ) {
    const extractJwtFromCookie = (req: Request) => {
      if (!req.cookies || !req.cookies['access_token'])
        throw new UnauthorizedException('You must log in to do this action');
      return req?.cookies['access_token'];
    };

    super({
      ignoreExpiration: false,
      secretOrKey: jwtConf.secret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: IAuthPayload) {
    return payload.userId;
  }
}
