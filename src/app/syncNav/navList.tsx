"use client";

import LCE from "@/src/components/ui/LCE/lce";
import { Button } from "@/components/primitives/button";
import React from "react";
import { action_tradeInfo_getAllFundsLastNAV } from "../actions/tradeInfo";
import DataTableContainer from "@/components/ui/dataTable/dataTableContainer";
import { useApiCall } from "@/src/hooks/useApiCall";

export default function NavList() {
  const { data, error, getData, status } =
    useApiCall<{ lastNAV: FipIranFundNav; info: FipIranFund }[]>("data");

  return (
    <div className="grid grid-rows-[auto_minmax(0,_1fr)] gap-1">
      <Button
        className="justify-self-start"
        onClick={() => {
          getData(action_tradeInfo_getAllFundsLastNAV.bind(null));
        }}
      >
        بگیر
      </Button>
      <LCE status={status} loading="loading..." error={error}>
        {data && (
          <div className="grid grid-rows-[auto_minmax(0,_1fr)_auto] gap-1">
            <DataTableContainer
              extraRowClasses="text-center"
              enableColumnDrag
              enableRowDrag
              stickyHeader
              enableSort
              enableTierShow
              enablePagination
              enableTableSize
              tableSizeClassName="justify-self-start w-auto"
              tableWrapperClasses="mb-1 border rounded-md overflow-auto"
              defaultSize={10}
              columns={[
                {
                  id: 1,
                  title: "id",
                  content: (row) => {
                    return row.info?.id;
                  },
                  sortable: true,
                },
                {
                  id: 2,
                  title: "symbol",
                  content: (row) => {
                    return row.info?.symbol;
                  },
                  sortable: true,
                },
                {
                  id: 3,
                  title: "regNo",
                  content: (row) => {
                    return row.info?.regNo;
                  },
                  sortable: true,
                },
                {
                  id: 4,
                  title: "NAV",
                  content: (row) => {
                    return row.lastNAV?.cancelNav;
                  },
                  toNumberWithCommas: true,
                  sortable: true,
                },
                {
                  id: 5,
                  title: "date",
                  content: (row) => {
                    return row.lastNAV?.date
                      ? new Intl.DateTimeFormat("fa-IR-u-nu-latn").format(
                          new Date(row.lastNAV?.date)
                        )
                      : "-";
                  },
                  sortable: true,
                },
              ]}
              content={{ items: data }}
            />
          </div>
        )}
      </LCE>
    </div>
  );
}
