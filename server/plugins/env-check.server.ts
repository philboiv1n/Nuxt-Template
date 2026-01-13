const requiredEnv = [
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
  'DATABASE_URL',
] as const;

export default defineNitroPlugin(() => {
  const invalid = requiredEnv.filter((key) => {
    const value = process.env[key];
    return !value || value.toUpperCase().includes('CHANGEME');
  });

  if (invalid.length > 0) {
    throw new Error(
      `Missing or default environment values: ${invalid.join(
        ', '
      )}. Update .env before starting the app.`
    );
  }
});
