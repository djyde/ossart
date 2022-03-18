import React from 'react'
import { getSession } from 'next-auth/react'
import { getFiveYearsCalendar, getYearCalendar } from '../core'
import { Box, Flex, FormControl, FormLabel, SimpleGrid, Text, Tooltip } from '@chakra-ui/react'
import dayjs from 'dayjs'

function IndexPage(props: {
  session,
  calendar
}) {
  const leftPanelWidth = "36rem"
  return (
    <>
      <Box>

        <Box className='not-printable' position={'fixed'} w={leftPanelWidth} top="0" left="0" bottom="0" bgColor={"gray.700"} >
          <FormControl>
            <FormLabel>
              Username
            </FormLabel>
          </FormControl>
        </Box>
        <Box className='preview' p="8" ml={leftPanelWidth}>

          <Preview calendar={props.calendar} title={`Randy Lu on GitHub`} />
        </Box>
      </Box>
    </>
  )
}

function Preview(props: {
  calendar,
  title: string
}) {
  return (
    <Box>
      <Text fontSize={"lg"} fontWeight="medium">
        {props.title}
      </Text>
      <Box as="hr" my="2" />
      <Box mt="8">

        {props.calendar.map(cal => {
          return (
            <Box my="4">
              <Wall calendar={cal} />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

function Wall(props: {
  calendar
}) {
  return (
    <>
      <Flex gap={2} mb="2" fontSize={"sm"} fontWeight="bold">
        <Text>{dayjs(props.calendar.weeks[0].contributionDays[0].date).format('YYYY')}:</Text>
        <Text>
          {props.calendar.totalContributions} contributions
        </Text>
      </Flex>
      <Flex gap="1" alignItems={'stretch'}>
        {props.calendar.weeks.map((item, weekIndex) => {
          return (
            <Flex gap={1} direction={"column"} justifyContent={weekIndex === 0 ? "end" : "start"}>
              {item.contributionDays.map(day => {
                return (
                  <Tooltip label={day.date}>
                    <Box w="2" h="2" bgColor={day.color}>

                    </Box>
                  </Tooltip>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const calendar = await getFiveYearsCalendar({
    login: 'djyde',
  })
  const session = await getSession(ctx)
  return {
    props: {
      session,
      calendar
    }
  }
}

export default IndexPage