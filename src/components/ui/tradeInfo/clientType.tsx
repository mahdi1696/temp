"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/primitives/table";
import DataTableContainer from "../dataTable/dataTableContainer";
import { sortBy } from "lodash";
import { getPercent, humanReadableNumTooltip } from "@/src/lib/utils/numUtils";

type Props = {
  client?: ClientType;
};

export default function ClientTypeTable({ client }: Props) {
  if (!client) {
    return null;
  }
  const allBuyersVolume =
    client.naturalPersonBuyerVolume + client.legalPersonBuyerVolume;
  const allSellersVolume =
    client.naturalPersonSellerVolume + client.legalPersonSellerVolume;

  const percent = (all: number, fraction: number) => {
    return `(٪ ${((100 * fraction) / all).toFixed(2)})`;
  };
  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="h-[unset] p-1">حجم</TableCell>
            <TableCell className="h-[unset] bg-blue-200 p-1 text-center">
              خرید
            </TableCell>
            <TableCell className="h-[unset] bg-red-200 p-1 text-center">
              فروش
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-1">حقیقی</TableCell>
            <TableCell className="p-1 text-center">
              {percent(allBuyersVolume, client.naturalPersonBuyerVolume)}{" "}
              {humanReadableNumTooltip(client.naturalPersonBuyerVolume)}
            </TableCell>
            <TableCell className="p-1 text-center">
              {percent(allSellersVolume, client.naturalPersonSellerVolume)}{" "}
              {humanReadableNumTooltip(client.naturalPersonSellerVolume)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-1">حقوقی</TableCell>
            <TableCell className="p-1 text-center">
              {percent(allBuyersVolume, client.legalPersonBuyerVolume)}{" "}
              {humanReadableNumTooltip(client.legalPersonBuyerVolume)}
            </TableCell>
            <TableCell className="p-1 text-center">
              {percent(allSellersVolume, client.legalPersonSellerVolume)}{" "}
              {humanReadableNumTooltip(client.legalPersonSellerVolume)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="h-[unset] p-1">تعداد</TableCell>
            <TableCell className="h-[unset] bg-blue-200 p-1 text-center">
              خرید
            </TableCell>
            <TableCell className="h-[unset] bg-red-200 p-1 text-center">
              فروش
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-1">حقیقی</TableCell>
            <TableCell className="p-1 text-center">
              {humanReadableNumTooltip(client.naturalPersonBuyerQuantity)}
            </TableCell>
            <TableCell className="p-1 text-center">
              {humanReadableNumTooltip(client.naturalPersonSellerQuantity)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-1">حقوقی</TableCell>
            <TableCell className="p-1 text-center">
              {humanReadableNumTooltip(client.legalPersonBuyerQuantity)}
            </TableCell>
            <TableCell className="p-1 text-center">
              {humanReadableNumTooltip(client.legalPersonBuyerQuantity)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
const className = "h-[unset] p-1 text-left bg-blue-300 px-0 bl";
const clientTypeVolume: DataTableColumn<ClientType>[] = [
  {
    id: "volume",
    title: "حجم",
  },
  {
    id: "buyVolume",
    title: "خرید",
    content: (it) => it.legalPersonBuyerQuantity,
    headerClass: "h-[unset] bg-blue-200",
    columnsClass: "p-1 text-center",
    toNumberWithCommas: true,
  },
  {
    id: "sellVolume",
    title: "فروش",
    content: (it) => it.volume,
    headerClass: "h-[unset] bg-blue-200",
    columnsClass: "p-1 text-center",
    toNumberWithCommas: true,
  },
];
const clientTypeQuantity: DataTableColumn<Bids["sellers"][number]>[] = [
  {
    id: "quantity",
    title: "حجم",
    headerGroup: true,
    span: 3,
    headerClass: "h-[unset] bg-blue-200",
  },
  {
    id: "buyQuantity",
    title: "خرید",
    content: (it) => it.quantity,
    headerClass: "h-[unset] bg-blue-200",
    columnsClass: "p-1 text-center",
    toNumberWithCommas: true,
  },
  {
    id: "sellQuantity",
    title: "فروش",
    content: (it) => it.volume,
    headerClass: "h-[unset] bg-blue-200",
    columnsClass: "p-1 text-center",
    toNumberWithCommas: true,
  },
];
