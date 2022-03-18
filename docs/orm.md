# Database ORM

We choose [Prisma](https://prisma.io) as the default ORM. Because it allows us to focus on writing data model schema, and it will generate TypeScript-friendly api to query data. Besides, it's easy to generate db migration files.

## Write your schema

?> Follow [Prisma guide](https://www.prisma.io/docs/concepts/components/prisma-schema) to learn how to write schema.

You can write the schema in `prisma/shcema.prisma`

## Setup database

### Apply the schema

You have two ways to apply the schema to your database:

1. Use `yarn db:push` to synchronize a new schema with an empty database. Use this only when you are prototyping your database, because it may causes data loss.
2. Use `yarn db:migrate` to generate a new migration.

?> See more about the [difference between push and migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push/#choosing-db-push-or-prisma-migrate).

### Generate SDK

Run `yarn db:generate` to generate js sdk.

## Query in server side

Import the `prisma` client which is exported from `utils.server.ts`:

```ts
import { prisma } from '../utils.server'

export default function IndexPage() {
  return (
    <div />
  )
}

export async getServersideProps() {
  const results = await prisma.xxx.findMany()
}
```

!> `prisma` from `utils.server.ts` is a singleton instance, it avoided the [`too many clients already` issue](https://github.com/prisma/prisma/issues/1983) already.

## Database Provider

By default, we use SQLite as database:

```prisma
// prisma/schema.prisma

datasource db {
  provider = "sqlite"
  url      = "file:../db.sqlite"
}
```

If you want to use another SQL provider (such as MySQL, PostgreSQL), change these lines to:

```prisma
// prisma/schema.prisma

datasource db {
  provider = "postgres"
  url      = env("DATABASE_URL")
}
```

`env("DATABASE_URL")` means it will read the connection url from environment variable `DATABASE_URL`. So, create a `.env` file in the project root and set your database connection url:

```bash
# .env
DATABASE_URL=postgresql://johndoe:randompassword@localhost:5432/mydb
```
