# Server-side utilities

## singletonSync

Singleton helper. When `process.env.NODE_ENV !== 'production'`, this function return value would be cached. It's useful for preventing duplicated call caused by next.js hot reload.

```ts
import { singleton } from './utils.server'

const foo = singletonSync('foo', () => {
  return new Foo()
})
```

## prisma

Singletoned prisma client instance.

## initMiddleware

Use connect-style middleware in next.js API handler and `getServerSideProps`:

```ts
import Cors from 'cors'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res)

  // ...
}

```

## getSession

Typed `getSession()` (next-auth).

## apiHandler

A pre-wrapped [next-connect](https://github.com/hoangvvo/next-connect) handler. Usually used in [API route](/api-route-middleware.md).

## HTTPException

A [@hapi/Boom](https://hapi.dev/module/boom/api) instance.