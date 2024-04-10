import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { join } from 'path';
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

(async function () {
  const pool = new Pool({
    connectionString: configService.get('DATABASE_URL'),
  });

  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: join(__dirname, 'migration') });
  console.log('Migration success');

  await pool.end();
})();
