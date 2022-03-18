# Authentication

We use [Next-Auth](https://next-auth.js.org) as the authentication solution.

## Add OAuth provider

?> next-auth providers: https://next-auth.js.org/configuration/providers

next-auth support many providers. You can add providers you want to use in `config.server.ts`.

### Example: GitHub

Create a `.env` file and set GitHub app's client id and secret:

```bash
# .env
GITHUB_ID=foo
GITHUB_SECRET=bar
```

Then add the GitHub provider in `config.server.ts`:

```ts
// config.server.ts

import Providers from "next-auth/providers";

export const authProviders = [
  Providers.GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  })
]
```

## Client side

?> More about next-auth usage: https://next-auth.js.org/getting-started/client

```jsx
import { useSession } from 'next-auth/client'

export default function Component() {
  const [ session, loading ] = useSession()

  if(session) {
    return <p>Signed in as {session.user.email}</p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}
```

## Server side

?> More about next-auth usage: https://next-auth.js.org/getting-started/client

We wrapped a `getSession` in `utils.server.ts`:

```js
import { getSession } from '../../utils.server'

export default async (req, res) => {
  const session = await getSession({ req })
  /* ... */
  res.end()
}
```

## Securing pages and API routes

https://next-auth.js.org/tutorials/securing-pages-and-api-routes