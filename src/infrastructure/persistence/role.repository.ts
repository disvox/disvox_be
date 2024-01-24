import { IRoleRepository, Role } from '@/domain';
import { PrismaService } from './prisma.service';

export class RoleRepository implements IRoleRepository {
  private readonly prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }

  create(data: Role): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Role | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
  getOne(filter: Partial<Role>): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  getMany(filter: Partial<Role>): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<Role>): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
