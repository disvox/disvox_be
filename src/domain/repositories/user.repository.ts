import { IRepository } from '@/shared';
import { UserEntity } from '../entities';

export interface IUserRepository extends IRepository<UserEntity> {}
