import React from "react";
import { action_holiday_getHolidayByPersianYear } from "../actions/holiday";
import HolidayTable from "./holidayTable";

type Props = {
  year?: string;
};

export default async function HolidayTableWrapper({ year }: Props) {
  if (year) {
    const holidays = await action_holiday_getHolidayByPersianYear(year);
    return <HolidayTable holidays={holidays} />;
  }

  return null;
}
