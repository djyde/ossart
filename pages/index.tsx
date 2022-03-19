import { Box, Button } from "@chakra-ui/react"
import { signIn } from "next-auth/react"
import { getSession } from "../utils.server"

function Intro() {
  return (
    <Box>
      <Button onClick={_ => signIn('github', {
        callbackUrl: '/generator'
      })}>Sign in with GitHub</Button>
    </Box>
  )
}

function HomePage() {
  return (
    <>
     <Intro /> 
    </>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx.req)
  return {
    props: {
      session 
    }
  }
}

export default HomePage