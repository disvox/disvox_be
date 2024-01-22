import { IUserRepository, UserEntity } from '@/domain';
import { PrismaService } from './prisma/prisma.service';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<UserEntity> {
    return this.prisma.user.create({ data: user });
  }

  getById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  getOne(filter: Partial<UserEntity>): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  getMany(filter: Partial<UserEntity>): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
