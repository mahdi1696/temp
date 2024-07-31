import LCE from "@/src/components/ui/LCE/lce";
import { Button } from "@/components/primitives/button";
import React from "react";
import {
  action_tradeInfo_syncAllFundsNAV,
  action_tradeInfo_syncAllFundsNavByTsetmcId,
} from "../actions/tradeInfo";
import { useApiCall } from "@/src/hooks/useApiCall";
import DataTableContainer from "@/components/ui/dataTable/dataTableContainer";

const SyncNav = () => {
  const { data, error, getData, status } = useApiCall<SyncResult>("data");

  return (
    <div className="grid grid-rows-[auto_minmax(0,_1fr)] gap-1">
      <div className="flex flex-col justify-self-start">
        <div className="flex gap-1">
          <Button
            onClick={() => {
              getData(action_tradeInfo_syncAllFundsNAV.bind(null));
            }}
          >
            به روز رسانی
          </Button>
          <Button
            onClick={() => {
              const failure = data?.failure.map((it) => it.tsetmcId);
              if (failure) {
                getData(
                  action_tradeInfo_syncAllFundsNavByTsetmcId.bind(null, failure)
                );
              }
            }}
          >
            به روز رسانی نا موفق ها
          </Button>
        </div>
        <p>
          موفق : {data?.success.length} , نا موفق : {data?.failure.length}
        </p>
      </div>
      <LCE status={status} loading="loading..." error={error}>
        {data && (
          <div className="grid grid-rows-[auto_minmax(0,_1fr)_auto] gap-1">
            <DataTableContainer
              extraRowClasses="text-center"
              stickyHeader
              enableSort
              enableTierShow
              enablePagination
              enableTableSize
              tableSizeClassName="justify-self-start w-auto"
              tableWrapperClasses="mb-1 border rounded-md overflow-auto"
              defaultSize={100}
              columns={[
                {
                  id: 1,
                  title: "نماد",
                  content: (row) => {
                    return row.symbol;
                  },
                  sortable: true,
                },
                {
                  id: 2,
                  title: "tsetmcId",
                  content: (row) => {
                    return row.tsetmcId;
                  },
                  sortable: true,
                },
                {
                  id: 3,
                  title: "وضعیت",
                  content: (row) => {
                    return row.success ? "موفق" : "نا موفق";
                  },
                  sortable: true,
                },
                {
                  id: 4,
                  title: "پیام",
                  content: (row) => {
                    return row.message;
                  },
                  sortable: true,
                },
              ]}
              content={{
                items: data?.failure.concat(data.success) ?? [],
              }}
            />
          </div>
        )}
      </LCE>
    </div>
  );
};

export default SyncNav;
