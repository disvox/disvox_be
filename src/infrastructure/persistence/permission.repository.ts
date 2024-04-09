import { IPermissionRepository, Permission } from '@/domain';
import { PrismaService } from './prisma.service';

export class PermissionRepository implements IPermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Permission): Promise<Permission> {
    const permission = await this.prisma.permission.create({
      data: { ...data, conditions: JSON.stringify(data.conditions) },
    });

    return { ...permission, conditions: JSON.parse(permission.conditions) };
  }
  getById(id: string): Promise<Permission | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Permission[]> {
    throw new Error('Method not implemented.');
  }
  getOne(filter: Partial<Permission>): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  getMany(filter: Partial<Permission>): Promise<Permission[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, data: Partial<Permission>): Promise<Permission> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
