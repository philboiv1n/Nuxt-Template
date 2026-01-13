import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const rawDatabaseUrl = process.env.DATABASE_URL;
const databaseUrl =
  !rawDatabaseUrl || rawDatabaseUrl.toUpperCase().includes('CHANGEME')
    ? 'postgresql://postgres@localhost:5432/placeholder'
    : rawDatabaseUrl;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
