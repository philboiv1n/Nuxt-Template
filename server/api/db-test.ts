import { createError } from 'h3';
import { getPrisma } from '../utils/prisma';

export default defineEventHandler(async () => {
  const isProd = process.env.NODE_ENV === 'production';

  try {
    const prisma = getPrisma();
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Database error';
    throw createError({
      statusCode: 503,
      statusMessage: isProd ? 'Database unavailable' : message,
    });
  }
});
