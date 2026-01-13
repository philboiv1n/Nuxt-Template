# Nuxt Template

Minimal Nuxt 4 starter with Docker, Node 24, PostgreSQL + Prisma, ESLint, Prettier, and nuxt-security.

## Requirements

- Docker + Docker Compose

## Quick start (Docker)

1. Copy env file:

```bash
cp .env.example .env
```

2. Update `.env` with real values (replace all `CHANGEME_*` placeholders).

3. Start the dev profile:

```bash
docker compose --profile dev up
```

4. Open http://localhost:3001

For production build:

```bash
docker compose --profile prod up --build
```

Open http://localhost:3000

## Scripts

- `npm run dev` - start Nuxt dev server
- `npm run build` - build production output
- `npm run start` - run the built server output
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run lint:fix` - fix lint issues when possible
- `npm run format` - format files with Prettier
- `npm run format:check` - check formatting without writing
- `npm run prisma` - Prisma CLI passthrough
- `npm run prisma:generate` - generate Prisma client
- `npm run migrate` - apply migrations (run from dev container/CI)
- `npm run migrate:dev` - create/apply migrations in dev
- `npm run db:studio` - open Prisma Studio

## Environment

The `.env` file is used by Docker and the app. Copy `.env.example` and replace **all** values:

```
POSTGRES_USER=CHANGEME_USER
POSTGRES_PASSWORD=CHANGEME_PASSWORD
POSTGRES_DB=CHANGEME_DB
DATABASE_URL=postgres://CHANGEME_USER:CHANGEME_PASSWORD@db:5432/CHANGEME_DB
```

The app refuses to start (dev and prod) while any value contains `CHANGEME`.
If the database was already initialized, remove the volume to apply new credentials.

## Database example (Prisma)

- Prisma config: `prisma.config.ts`
- Prisma schema: `prisma/schema.prisma`
- Prisma client helper: `server/utils/prisma.ts`
- Test endpoint: `/api/db-test`
- UI shows DB status from `pages/index.vue`

To create the sample table from the Prisma schema:

```bash
docker compose --profile dev run --rm dev npm run migrate:dev -- --name init
```

Prisma CLI runs in dev/CI only; the production image does not include it. To deploy migrations:

```bash
docker compose --profile dev run --rm dev npm run migrate
```

If you run Nuxt outside Docker, generate the client after install and schema changes:

```bash
npm run prisma:generate
```

## Security note

nuxt-security is enabled. CSP is applied in production only; it's disabled in dev to avoid blocking HMR.

The database runs on an internal Docker network and is **not** exposed to the host by default.
If you need host access for tooling, add a port mapping like:

```
ports:
  - "127.0.0.1:5432:5432"
```

## Folder conventions

- `layouts/` - shared page wrappers (default layout)
- `pages/` - route pages; each `*.vue` becomes a route
- `components/` - reusable UI components (auto-imported)
- `server/api/` - API routes; `server/api/db-test.ts` maps to `/api/db-test`
- `server/utils/` - server helpers (Prisma, etc.)
- `app.vue` - root layout shell
- `prisma/` - schema and migrations
- `docker-compose.yml` - dev + prod services and Postgres
- `Dockerfile` - production image build

## Notes

- Default credentials are for local development only - Please update before pushing to production.

## Contributors

- [Phil Boivin](https://www.philboivin.com)
