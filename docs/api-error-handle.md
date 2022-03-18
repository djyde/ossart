# Handle error in API routes

Sometimes you want to response HTTP error in API route. We catch all errors in [apiHandler](/api-route-middleware.md) and integrate with [@hapi/boom](https://hapi.dev/module/boom/api/?v=9.1.2), which is a very useful utility for returning HTTP errors.

We exposed `HTTPException` from `utils.server.ts`, which is the instance of `Boom`.

For example, suppose you want to throw an 404 error in server side:

```ts
// pages/api/foo.ts

export default apiHandler
  .get(async (req, res) => {

    if (!something) {
      throw HTTPException.notFound('xxx not found')
    }

    res.json({
      data: something
    })
  })
```

!> Pleast note that it only works in the api routes that use [`apiHandler`](/api-route-middleware.md).