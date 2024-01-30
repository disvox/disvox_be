import { IRoleRepository, Permission, Role } from '@/domain';
import { PrismaService } from './prisma.service';

export class RoleRepository implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  createWithPermissionIds(
    data: Role,
    permissionIds: string[],
  ): Promise<Role & { permissions: Permission[] }> {
    return this.prisma.role.create({
      data: {
        ...data,
        permissions: {
          connect: permissionIds.map((id) => ({
            id,
          })),
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  getMany(filter: Partial<Role>): Promise<Role[]> {
    throw new Error('Method not implemented.');
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

  update(id: string, data: Partial<Role>): Promise<Role> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
