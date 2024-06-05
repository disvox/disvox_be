import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { join } from 'path';
import { config } from 'dotenv';
import mysql from 'mysql2/promise';

config();

const configService = new ConfigService();

(async function () {
  const pool = mysql.createPool({
    uri: configService.get('DATABASE_URL'),
  });

  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: join(__dirname, 'migration') });
  console.log('Migration success');

  await pool.end();
})();
