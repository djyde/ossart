import axios from "axios";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { Cache } from "./cache";
import { apiClient } from "./utils.client";
import { HTTPException } from "./utils.server";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
export async function getYearCalendar(params: {
  login: string;
  fromYear: string;
  token: string
}) {
  const query = `query GetCalendar($login: String!, $from: DateTime) { 
  user(login: $login) {
    contributionsCollection(from: $from) {
      contributionCalendar {
        totalContributions,
        weeks {
          contributionDays {
            color,
            date
          }
        }
      }
    }
  }
}`;

  const result = await axios.post(
    "https://api.github.com/graphql",
    {
      query,
      variables: {
        login: params.login,
        // @ts-expect-error
        from: dayjs.utc(params.fromYear),
      },
    },
    {
      headers: {
        Authorization: `bearer ${params.token}`,
      },
    }
  );
  if (result.data.errors?.length) {
    throw HTTPException.notFound(result.data.errors[0].message);
  }
  return result.data.data.user.contributionsCollection.contributionCalendar;
}

export async function getFiveYearsCalendar(params: { token: string, login: string }, options?: {
  offset?: string
}) {
  const offset = options.offset ? Number(options.offset) : 0;
  const cal = await Promise.all(
    [0, 0, 0, 0, 0, 0].map(async (_, index) => {
      const year = dayjs()
        .subtract(index + 1 + offset, "year")
        .get("year")
        .toString();
      return {
        id: nanoid(12),
        ...(await getYearCalendar({
          login: params.login,
          fromYear: year,
          token: params.token
        })),
      };
    })
  );
  return cal;
}
