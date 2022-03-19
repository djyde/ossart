import { Box, Button, Container, Link, Text, VStack } from "@chakra-ui/react"
import { signIn } from "next-auth/react"
import { getSession } from "../utils.server"

function Intro() {
  return (
    <>
      <VStack alignItems={"start"}>
        <Text>This is a tool to generate your GitHub activity as an artwork. You can generate a near 6 years contribution map by any username, and then print it to an A4 paper.</Text>
        <Text>This project is inspired by <Link textDecoration={"underline"} href="https://codeprints.dev/">Codeprints</Link> but this is free and open source project for everyone can print their own artwork.</Text>
      </VStack>
      <Box mt="4">
        <Button size="xs" colorScheme={"green"} onClick={_ => signIn('github', {
          callbackUrl: '/generator'
        })}>Sign in with GitHub to get start</Button>
      </Box>
    </>
  )
}

function HomePage() {
  return (
    <>
      <Container mt="12">
        <Text mb="4" fontSize={"lg"} fontWeight="bold">OSSArt</Text>
        <Intro />
      </Container>
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