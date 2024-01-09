import { Repository } from '@/base';
import { UserEntity } from '../entities';

export abstract class UserRepository extends Repository<UserEntity> {}
