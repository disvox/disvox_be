export class CreatedUserDto {
  id: string;
  username: string;
  discriminator: string;
  email: string;
  lastSeen: Date;
}
