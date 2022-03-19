import axios from "axios";
import { getSession } from "next-auth/react";
import { getFiveYearsCalendar } from "../../core";
import { apiHandler, HTTPException } from "../../utils.server";

export default apiHandler().get(async (req, res) => {
  const session = await getSession({
    req
  })

  if (!session) {
    throw HTTPException.unauthorized("Please login")
  }

  const result = await getFiveYearsCalendar({
    login: req.query.login as string,
    token: session.accessToken as string
  });
  res.json({
    calendar: result
  })
});
