"use client";

import LCE from "@/src/components/ui/LCE/lce";
import { Button } from "@/components/primitives/button";
import React from "react";
import { action_tradeInfo_getAllFundsLastTradeInfo } from "../actions/tradeInfo";
import { useApiCall } from "@/src/hooks/useApiCall";
import DataTableContainer from "@/components/ui/dataTable/dataTableContainer";

export default function PriceInfoList() {
  const { data, error, getData, status } = useApiCall<StockTradeInfo[]>("data");

  return (
    <div className="grid grid-rows-[auto_minmax(0,_1fr)] gap-1">
      <Button
        className="justify-self-start"
        onClick={() => {
          getData(action_tradeInfo_getAllFundsLastTradeInfo.bind(null));
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
                    return row.id;
                  },
                  sortable: true,
                },
                {
                  id: 2,
                  title: "symbol",
                  content: (row) => {
                    return row.symbol;
                  },
                  sortable: true,
                },
                {
                  id: 3,
                  title: "قیمت پایانی",
                  content: (row) => {
                    return row.closePrice;
                  },
                  toNumberWithCommas: true,
                  sortable: true,
                  extraClass(row) {
                    return "tabular-nums";
                  },
                },
                {
                  id: 4,
                  title: "قیمت معامله",
                  content: (row) => {
                    return row.tradePrice;
                  },
                  toNumberWithCommas: true,
                  sortable: true,
                },
                {
                  id: 5,
                  title: "date",
                  content: (row) => {
                    return new Intl.DateTimeFormat("fa-IR-u-nu-latn").format(
                      new Date(row.date)
                    );
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
