import { IUserRepository, TUserRelation, User } from '@/domain';
import { PrismaService } from './prisma.service';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneWithPopulate(filter: Partial<User & TUserRelation>): Promise<any> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: filter.id },
      include: { permissions: true, roles: { include: { permissions: true } } },
    });
  }

  async create(data: User): Promise<User> {
    return this.prisma.user.create({ data });
  }

  getById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async getOne(filter: Partial<User>): Promise<User | null> {
    return this.prisma.user.findFirst({ where: filter });
  }
  getMany(filter: Partial<User>): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
