"use server";

import {
  date_delete_deleteHolidayById,
  date_get_holidaysByPersianYear,
  date_post_addHoliday,
} from "@/src/constants/urls";

export const action_holiday_getHolidayByPersianYear = async (
  year: string
): Promise<{ id: number; date: Date; pDate: string }[]> => {
  const response = await fetch(date_get_holidaysByPersianYear + "/" + year, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_holiday_deleteHolidayById = async (
  id: number
): Promise<unknown> => {
  const response = await fetch(date_delete_deleteHolidayById, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_holiday_addHoliday = async (
  pDate: string
): Promise<unknown> => {
  const response = await fetch(date_post_addHoliday, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ pDate }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
