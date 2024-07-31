"use client";
import { TableCell } from "@/components/primitives/table";
import { useState, useEffect, memo, ReactNode } from "react";

interface Props {
  changingValue?: string | number | null;
  children?: ReactNode;
  [rest: string]: any;
}

const DataTableBoldCell = ({ changingValue, children, ...rest }: Props) => {
  const [bold, setBold] = useState(false);

  useEffect(() => {
    if (!bold) setBold(true);
  }, [changingValue, bold]);

  useEffect(() => {
    if (bold) setTimeout(() => setBold(false), 1000);
  }, [bold]);

  return (
    <TableCell {...rest} className={`${bold ? "font-bold" : "font-normal"}`}>
      {children}
    </TableCell>
  );
};
export default memo(DataTableBoldCell);
