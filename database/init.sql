-- JPLingo PostgreSQL initialization.
--
-- Applied automatically by docker-entrypoint-initdb.d on first container start
-- (see docker-compose.yml -> POSTGRES_DB=jplingo_dev).
--
-- Application schema/tables are managed by Prisma migrations, so this file only
-- guarantees the default public schema exists and is idempotent.

CREATE SCHEMA IF NOT EXISTS public;
