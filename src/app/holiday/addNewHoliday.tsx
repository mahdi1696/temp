"use client";

import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import React, { useState } from "react";
import { action_holiday_addHoliday } from "../actions/holiday";
import { useRouter } from "next/navigation";

type Props = {};

export default function AddNewHoliday({}: Props) {
  const router = useRouter();
  const [year, setYear] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [day, setDay] = useState<string>();
  const [inserting, setInserting] = useState(false);
  const [message, setMessage] = useState<string>();

  return (
    <div>
      <div className="flex justify-between gap-1 ">
        <Button
          className="ml-4"
          disabled={inserting}
          onClick={() => {
            if (day && month && year) {
              setInserting(true);
              setMessage("");
              action_holiday_addHoliday(`${year}/${month}/${day}`)
                .then((res) => {
                  setMessage("insert was successful");
                  router.refresh();
                })
                .catch((err) => {
                  setMessage(err?.message ?? "there is an error");
                  console.error(err);
                })
                .finally(() => {
                  setInserting(false);
                });
            }
          }}
        >
          add
        </Button>
        <Input
          onChange={(e) => {
            setDay(e.target.value);
          }}
          placeholder="day"
          type="number"
          min={1}
          max={31}
        />
        /
        <Input
          placeholder="month"
          type="number"
          min={1}
          max={12}
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        />
        /
        <Input
          placeholder="year"
          type="number"
          min={1369}
          max={1500}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}
