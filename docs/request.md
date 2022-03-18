# Client-side request

## Making API request

We wrapped a `apiClient` in `utils.client.ts`. It's an [axios](https://github.com/axios/axios) instance. The `baseUrl` is `/api` by default. Here is the example of making a HTTP request:

```ts
import { apiClient } from '../utils.client.ts'

async function getPosts() {
  const res = await apiClient.get('/posts')
  return res.data
}

async function addPost(title: string) {
  const res = await apiClient.post('/posts', {
    title
  })
}
```

!> Please notice that you don't need to write the `/api` prefix.

## Reactive UI with API request

Using [react-query](https://react-query.tanstack.com/) helps you easily make UI reactive with the API request state.

### Query example

?> Know more how to use query: https://react-query.tanstack.com/guides/queries

```jsx
import { useQuery } from 'react-query'

async function getPosts() {
  const res = await apiClient.get('/posts')
  return res.data
}

export default function App() {
  const getPostsQuery = useQuery('getPosts', getPosts)

  return (
    <div>
      {getPostsQuery.isLoading && <span>Loading...</span>}
    </div>
  )
}
```

### Mutation example

?> Know more how to use mutation: https://react-query.tanstack.com/guides/mutations


```jsx
import { useMutation } from 'react-query'

async function createPost({ title }) {
  const res = await apiClient.post('/posts', {
    title
  })
  return res.data
}

export default function App() {
  const createPostMutation = useMutation(createPost)

  const inputRef = React.useRef(null)

  return (
    <div>
      <input type="text" ref={inputRef} />
      <Button isLoading={createPostMutation.isLoading} onClick={_ => createPostMutation.mutate({ title: inputRef.current.value })}>create</Button>
    </div>
  )
}
```