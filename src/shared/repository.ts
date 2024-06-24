import { Entity } from './entity';

export interface IRepository<TEntity extends Entity> {
  create(data: Omit<TEntity, 'id'>): Promise<TEntity>;
  getById(id: string): Promise<TEntity | null>;
  getAll(): Promise<TEntity[]>;
  getOne(filter?: Partial<TEntity>, raw?: string): Promise<TEntity | null>;
  getMany(filter?: Partial<TEntity>, raw?: string): Promise<TEntity[]>;
  update(id: string, data: Partial<TEntity>): Promise<TEntity>;
  delete(id: string): Promise<void>;
}
