export interface OauthUser {
  provider: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
}
