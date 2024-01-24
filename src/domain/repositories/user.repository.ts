import { IRepository } from '@/shared';
import { TUserRelation, User } from '../entities';

export interface IUserRepository extends IRepository<User & TUserRelation> {}

export const UserRepositoryToken = Symbol('IUserRepository');
