import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { googleConfig } from '@/infrastructure/framework/configs';
import { OauthUser } from '../dtos/auth.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleConfig.KEY)
    private googleConf: ConfigType<typeof googleConfig>,
  ) {
    super({
      clientID: googleConf.clientId,
      clientSecret: googleConf.clientSecret,
      callbackURL: googleConf.callbackUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, provider } = profile;

    const user: OauthUser = {
      provider,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      avatarUrl: photos[0].value,
    };

    done(null, user);
  }
}
