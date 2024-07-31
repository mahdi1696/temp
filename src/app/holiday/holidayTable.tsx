"use client";

import React, { useState } from "react";
import { Button } from "@/components/primitives/button";
import { action_holiday_deleteHolidayById } from "../actions/holiday";
import { useRouter } from "next/navigation";
import DataTableContainer from "@/components/ui/dataTable/dataTableContainer";

type Props = {
  holidays: Holiday[];
};

export default function HolidayTable({ holidays }: Props) {
  const router = useRouter();
  const [deletingRow, setDeletingRow] = useState<Holiday>();

  const onDeleteClick = (row: Holiday) => {
    setDeletingRow(row);
    action_holiday_deleteHolidayById(row.id)
      .then((res) => {
        alert("deleting was successful");
        router.refresh();
      })
      .catch((err) => {
        alert("there is an error");
        console.error(err);
      })
      .finally(() => {
        setDeletingRow(undefined);
      });
  };

  return (
    <DataTableContainer
      enableTierShow
      enableSort
      extraRowClasses="text-center"
      content={{
        items: holidays,
      }}
      columns={[
        {
          id: 1,
          title: "date",
          content: (row) => row.pDate,
          getValue: (row) => row.date.toString(),
          sortable: true,
        },
        {
          id: 2,
          title: "del",
          content: (row) => (
            <Button
              disabled={row.id == deletingRow?.id}
              variant="destructive"
              onClick={() => {
                onDeleteClick(row);
              }}
            >
              {row.id == deletingRow?.id ? "deleting" : "del"}
            </Button>
          ),
        },
      ]}
    />
  );
}
