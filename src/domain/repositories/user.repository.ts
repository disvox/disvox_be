import { IRepository } from '@/shared';
import { TUserRelation, User } from '../entities';

export interface IUserRepository extends IRepository<User & TUserRelation> {
  getOneWithPopulate(
    filter: Partial<User & TUserRelation>,
    populate: {
      roles: boolean;
      permissions: boolean;
    },
  ): Promise<User & TUserRelation>;
}

export const UserRepositoryToken = Symbol('IUserRepository');
