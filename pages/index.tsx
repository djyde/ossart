import { Box, Button, Container, Link, Text, VStack, Image, Flex, Center, Code } from "@chakra-ui/react"
import { signIn } from "next-auth/react"
import Head from "next/head"
import { getSession } from "../utils.server"
function Intro() {
  return (
    <>
      <Head>
        <title>OSSArt | Print your GitHub activity as an artwork</title>
      </Head>
      <VStack alignItems={"start"}>
        <Box my="12">
          <Image src="https://gbstatic.djyde.com/uPic/h7JgM0.jpg?x-oss-process=style/80" ></Image>
        </Box>
        <Text>This is a tool to generate your GitHub activity as an artwork. You can generate a near 6 years contribution map by any username, and then print it to an A4 paper and wrap it in a photo frame you bought yourself.</Text>
        <Text>This project is inspired by <Link textDecoration={"underline"} href="https://codeprints.dev/">Codeprints</Link> but this is free and <Link href="https://github.com/djyde/ossart">open source</Link> project for everyone can print their own artwork.</Text>
        <Center w="full">

          <Button my="4" className="umami--click-signin-button" size="xs" colorScheme={"green"} onClick={_ => signIn('github', {
            callbackUrl: '/generator'
          })}>Sign in with GitHub to get start</Button>
        </Center>
        <Box as="hr"></Box>
        <VStack alignItems={"stretch"}>
          <Text>If you like this project, you could consider <Link textDecor={"underline"} href="https://github.com/sponsors/djyde">sponsor me on GitHub</Link>.</Text>
          <Text>Or you can just <Link textDecor={'underline'} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`#ossart This is my GitHub contributions artwork made by https://getoss.art !`)}`}>share your artwork on Twitter</Link> with a <Code>#ossart</Code> tag to let me know.</Text>
        </VStack>
      </VStack>
      <Center>

        <Image w="96" my="12" src="https://gbstatic.djyde.com/uPic/0W475B.jpg?x-oss-process=style/80"></Image>
      </Center>

      <Center>
        <Text fontSize={'xs'} color="gray.700" p="12">This project is made by <Link textDecor={"underline"} href="https://twitter.com/randyloop">Randy Lu</Link></Text>
      </Center>
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