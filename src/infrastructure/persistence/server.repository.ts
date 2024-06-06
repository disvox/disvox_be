import { Inject } from '@nestjs/common';
import { inArray, sql } from 'drizzle-orm';

import { IServerRepository, Server } from '@/domain';
import { ExtendedMySql2Database } from './type';
import { schema, servers, userServers } from './drizzle';
import { DRIZZLE_TOKEN } from '../token';

export class ServerRepository implements IServerRepository {
  constructor(
    @Inject(DRIZZLE_TOKEN)
    private readonly drizzle: ExtendedMySql2Database<typeof schema>,
  ) {}

  create(data: Server): Promise<Server> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Server | null> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<Server[]> {
    throw new Error('Method not implemented.');
  }
  getOne(filter: Partial<Server>): Promise<Server | null> {
    throw new Error('Method not implemented.');
  }

  async getMany(filter: string | Partial<Server>): Promise<Server[]> {
    const userServersResults = await this.drizzle
      .select()
      .from(userServers)
      .where(sql([filter] as any));

    return this.drizzle
      .select()
      .from(servers)
      .where(
        inArray(
          servers.id,
          userServersResults.map((userServers) => userServers.serverId),
        ),
      );
  }

  update(id: string, data: Partial<Server>): Promise<Server> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
