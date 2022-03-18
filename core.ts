import axios from "axios";
import dayjs from "dayjs";
import { apiClient } from "./utils.client";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
export async function getYearCalendar(params: {
  login: string;
  fromYear: string;
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

  try {
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
          Authorization: "bearer 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",
        },
      }
    );
    return result.data.data.user.contributionsCollection.contributionCalendar;
  } catch (e) {
    console.log(e);
  }
}

export async function getFiveYearsCalendar(params: { login: string }) {
  const cal = await Promise.all(
    [0, 0, 0, 0, 0, 0].map(async (_, index) => {
      const year = dayjs().subtract(index + 1, "year").get("year").toString();
      return await getYearCalendar({
        login: params.login,
        fromYear: year,
      });
    })
  );
  return cal
}
