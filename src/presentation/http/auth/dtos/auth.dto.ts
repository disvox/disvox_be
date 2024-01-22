export interface OauthUser {
  provider: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
}
