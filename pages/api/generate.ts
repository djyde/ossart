import axios from "axios";
import { getFiveYearsCalendar } from "../../core";
import { apiHandler } from "../../utils.server";

export default apiHandler().get(async (req, res) => {
  const result = await getFiveYearsCalendar({
    login: req.query.login as string,
  });
  res.json({
    calendar: result
  })
});
