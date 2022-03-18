# API route middleware

Next.js doesn't have middleware. But we use [next-connect](https://github.com/hoangvvo/next-connect) to make use of Express middlewares.

In your api route handler, use our `apiHandler` in `utils.server.ts`. Here is the example using `cors` middleware in an api route:

```ts
// pages/api/foo.ts

import { apiHandler } from '../../utils.server'
import cors from 'cors'

export default apiHandler()
  .use(cors({
    methods: ['GET', 'POST']
  }))
  .get(async (req, res) => {
    res.json({
      // ...
    })
  })
  .post(async (req, res) => {
    res.json({
      // ...
    })
  })
```