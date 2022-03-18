import React from 'react'
import { getSession } from 'next-auth/react'
import { getFiveYearsCalendar, getYearCalendar } from '../core'
import { Box, Flex, SimpleGrid, Text, Tooltip } from '@chakra-ui/react'
import dayjs from 'dayjs'

function IndexPage(props: {
  session,
  calendar
}) {
  return (
    <>
      <Preview calendar={props.calendar} title={`Randy Lu on GitHub`} />
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