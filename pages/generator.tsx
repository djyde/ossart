import React, { useMemo, useRef } from 'react'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { getFiveYearsCalendar, getYearCalendar } from '../core'
import { Box, Button, Flex, FormControl, FormLabel, Input, SimpleGrid, SkeletonText, Spacer, Text, toast, Tooltip, useToast, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useMutation, useQuery } from 'react-query'
import { apiClient } from '../utils.client'
import { AxiosError } from 'axios'
import Head from 'next/head'

function IndexPage(props: {
}) {
  const session = useSession()
  const toast = useToast()
  const [username, setUsername] = React.useState("")
  const leftPanelWidth = "36rem"

  const getCalendarQuery = useMutation(async () => {
    const result = await apiClient.get('/generate', {
      params: {
        login: username.trimStart().trimEnd()
      }
    })
    return result.data.calendar
  }, {
    onError(e: AxiosError) {
      toast({
        status: 'error',
        position: 'top',
        description: e.response.data.message
      })
    }
  })

  return (
    <>

      <Head>
        <title>OSSArt | Print your GitHub activity as an artwork</title>
      </Head>
      <Box>

        <Box borderRight={"1px solid"} borderColor="gray.200" p="4" px="8" className='not-printable' position={'fixed'} w={leftPanelWidth} top="0" left="0" bottom="0" >
          <VStack gap="2" alignItems={"stretch"}>
            <Flex>
              <Text>Welcome {session.data.user.name} </Text>
              <Spacer />
              <Button className='umami--click--signout-button' size="xs" onClick={_ => {
                signOut({
                  callbackUrl: '/'
                })
              }}>Logout</Button>
            </Flex>
            <FormControl isRequired>
              <FormLabel>
                username
              </FormLabel>
              <Input value={username} onChange={_ => {
                setUsername(_.target.value)
              }} size="sm" placeholder='e.g. djyde' />
            </FormControl>
            {/* <FormControl>
              <FormLabel>
                title
              </FormLabel>
              <Input size="sm" />
            </FormControl> */}

            <FormControl>
              <Button className='umami--click--generate-button' isLoading={getCalendarQuery.isLoading} onClick={_ => {
                if (username.trimStart().trimEnd()) {
                  getCalendarQuery.mutate()
                }
              }} colorScheme={"green"} size="xs">
                Generate
              </Button>
            </FormControl>

          </VStack>
          <Box mt="8" rounded="lg" borderColor={"green.100"} borderWidth="1px" p="4" fontSize={"sm"} bgColor="green.50" color="green">
            <Text mb="2" fontWeight="bold">
              How to print?
            </Text>

            <Text>
              {`In your browser's menu, click File > Print`}
            </Text>
          </Box>
        </Box>
        <Box className='preview' p="8" ml={leftPanelWidth}>

          <Preview isLoading={getCalendarQuery.isLoading} calendar={getCalendarQuery.data} title={`@${username} on GitHub`} />
        </Box>
      </Box>
    </>
  )
}

function Preview(props: {
  isLoading: boolean,
  calendar,
  title: string
}) {
  if (props.isLoading) {
    return (
      <Box>
        <SkeletonText />
      </Box>
    )
  } else if (!props.isLoading && !props.calendar) {
    return (
      <Box>

      </Box>
    )
  } else {

    return (
      <Box>
        <Text fontSize={"lg"} fontWeight="medium">
          {props.title}
        </Text>
        <Box as="hr" my="2" />
        <Box mt="8">

          {props.calendar?.map(cal => {
            console.log(cal)
            return (
              <Box key={cal.id} my="8">
                <Wall calendar={cal} />
              </Box>
            )
          })}
        </Box>

        <Box color="gray.500" fontSize={"xs"}>
          Made by <Box as="span" textDecoration={"underline"}>getoss.art</Box>
        </Box>
      </Box>
    )
  }
}

function Wall(props: {
  calendar
}) {
  const Canvas = useMemo(() => {
    return props.calendar.weeks.map((item, weekIndex) => {
      return (
        <Flex key={weekIndex} gap={1} direction={"column"} justifyContent={weekIndex === 0 ? "end" : "start"}>
          {item.contributionDays.map(day => {
            return (
              <Tooltip key={day.date} label={day.date}>
                <Box w="2" h="2" bgColor={day.color}>

                </Box>
              </Tooltip>
            )
          })}
        </Flex>
      )
    })
  }, [props.calendar])
  return (
    <>
      <Flex gap={2} mb="2" fontSize={"sm"} fontWeight="bold">
        <Text>{dayjs(props.calendar.weeks[0].contributionDays[0].date).format('YYYY')}:</Text>
        <Text>
          {props.calendar.totalContributions} contributions
        </Text>
      </Flex>
      <Flex gap="1" alignItems={'stretch'}>
        {Canvas}
      </Flex>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
  return {
    props: {
      session,
    }
  }
}

export default IndexPage