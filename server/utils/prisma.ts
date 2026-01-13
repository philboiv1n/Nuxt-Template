import { Pool } from 'pg';
import prismaPkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = prismaPkg;

type PrismaClientInstance = InstanceType<typeof PrismaClient>;
type PrismaGlobal = typeof globalThis & {
  prisma?: PrismaClientInstance;
  pgPool?: Pool;
};

const globalForPrisma = globalThis as PrismaGlobal;

const createPool = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }
  return new Pool({ connectionString });
};

const pool = globalForPrisma.pgPool ?? createPool();
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.pgPool = pool;
}

const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: new PrismaPg(pool) });
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const getPrisma = () => prisma;
