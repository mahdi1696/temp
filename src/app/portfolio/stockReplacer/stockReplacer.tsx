import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/primitives/dialog";
import TableColumnsCriteria from "@/app/tables/tableColumnsCriteria";
import { action_company_search } from "@/app/actions/company";
import { Criteria } from "@/app/tables/definition";
import Pagination from "@/components/ui/pagination";
import DataTable from "@/components/ui/dataTable/dataTable";
type Props = {
  onUpdateCB: (company: Company | null) => void;
  onCloseModal: (close: boolean) => void;
  open: boolean;
};

export default function StockReplacer({
  open,
  onCloseModal,
  onUpdateCB,
}: Props) {
  const [data, setData] = useState<{
    result: Company[];
    total: number;
  }>();

  const takeRef = useRef(20);

  const [query, setQuery] = useState<{
    [key: string]: Criteria;
  }>({});

  const getData = (
    q: { [key: string]: Criteria },
    take: number = takeRef.current,
    skip: number = 0
  ) => {
    action_company_search({
      query: q,
      take,
      skip,
    })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //فولاد
  return (
    <Dialog
      onOpenChange={(state) => {
        onCloseModal(state);
      }}
      open={open}
    >
      {/*   <DialogHeader>
        <DialogTitle>ویرایش پیشنهاد</DialogTitle>
      </DialogHeader> */}
      <DialogContent className="max-w-[80vw] block h-full">
        <div className="grid grid-rows-[auto_minmax(0,_1fr)_auto] h-full">
          <TableColumnsCriteria
            columns={[
              { type: "number", name: "id" },
              { type: "string", name: "symbol" },
              { type: "string", name: "symbolLong" },
            ]}
            onTake={(q) => {
              setQuery(q);
              getData(q);
            }}
            className="w-[120px]"
          />

          <div className="overflow-auto">
            {data && (
              <DataTable
                tableClassName="p-2"
                stickyHeader
                items={data.result}
                handleMoveColumn={() => {}}
                handleMoveItem={() => {}}
                columns={[
                  {
                    id: 0,
                    title: "id",
                    content: (row) => row.id,
                  },
                  {
                    id: 1,
                    title: "نماد",
                    content: (row) => row.symbol,
                  },

                  {
                    id: 5,
                    title: "نماد طولانی",
                    content: (row) => row.symbolLong,
                  },
                ]}
                extraRowClasses="cursor-pointer"
                onRowClick={(row) => {
                  onUpdateCB(row);
                }}
              />
            )}
          </div>
          <Pagination
            className="p-2"
            take={20}
            total={data?.total}
            cb={(p) => {
              getData(query, takeRef.current, takeRef.current * p);
            }}
            onPageSizeChange={(size) => {
              takeRef.current = size;
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
