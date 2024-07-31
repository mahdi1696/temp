"use client";

import DataTableContainer from "../dataTable/dataTableContainer";
import { numberWithCommas } from "@/src/lib/utils/numUtils";
import { sortBy } from "lodash";

type Props = {
  bids?: Bids;
};

export default function BidsTable({ bids }: Props) {
  if (!bids) {
    return null;
  }
  return (
    <div className="flex">
      <div className="flex-grow">
        <DataTableContainer
          columns={buyersTableColumns}
          content={{ items: sortBy(bids.buyers, (it) => it.row) }}
          tableWrapperClasses="rounded-md border overflow-auto"
        />
      </div>
      <div className="flex-grow">
        <DataTableContainer
          columns={sellersTableColumns}
          content={{ items: sortBy(bids.sellers, (it) => it.row) }}
          tableWrapperClasses="rounded-md border overflow-auto"
        />
      </div>
    </div>
  );
}
const className = "h-[unset] p-1 text-left bg-blue-300 px-0 bl";
const buyersTableColumns: DataTableColumn<Bids["buyers"][number]>[] = [
  {
    id: "buy",
    title: "خرید",
    headerGroup: true,
    span: 3,
    headerClass: "h-[unset] bg-blue-200",
  },
  {
    id: "quantity",
    title: "تعداد",
    content: (it) => it.quantity,
    headerClass: "h-[unset] bg-blue-200",
    columnsClass: "p-1 text-center",
    toNumberWithCommas: true,
  },
  {
    id: "volume",
    title: "حجم",
    content: (it) => it.volume,
    headerClass: "h-[unset] bg-blue-200",
    columnsClass: "p-1 text-center",
    toNumberWithCommas: true,
  },
  {
    id: "price",
    title: "قیمت",
    content: (it) => it.buyPrice,
    headerClass: "h-[unset] text-left bg-blue-200 px-1",
    columnsClass: "p-1 text-left",
    thDivClass: "block",
    toNumberWithCommas: true,
  },
];
const sellersTableColumns: DataTableColumn<Bids["sellers"][number]>[] = [
  {
    id: "buy",
    title: "فروش",
    headerGroup: true,
    span: 3,
    headerClass: "h-[unset] bg-red-200",
  },
  {
    id: "price",
    title: "قیمت",
    content: (it) => it.sellPrice,
    headerClass: "h-[unset] text-right bg-red-200 px-1",
    columnsClass: "p-1 text-right",
    thDivClass: "block",
    toNumberWithCommas: true,
  },
  {
    id: "volume",
    title: "حجم",
    content: (it) => it.volume,
    headerClass: "h-[unset] bg-red-200",
    columnsClass: "p-1 text-center",
    toNumberWithCommas: true,
  },
  {
    id: "quantity",
    title: "تعداد",
    content: (it) => it.quantity,
    headerClass: "h-[unset] bg-red-200",
    columnsClass: "p-1 text-center",
    toNumberWithCommas: true,
  },
];
