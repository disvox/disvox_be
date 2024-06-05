import { IRepository } from '@/shared';
import { Permission, Role, User } from '../entities';

export interface IUserRepository extends IRepository<User> {
  getOneWithPopulate(filter: Partial<User>): Promise<
    User & {
      roles: Role[];
      permissions: Permission[];
    }
  >;
}

export const UserRepositoryToken = Symbol('IUserRepository');
