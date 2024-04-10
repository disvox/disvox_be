export interface IOauthUser {
  provider: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
}

export interface IJwtPayload {
  sub: number;
  email: string;
}
