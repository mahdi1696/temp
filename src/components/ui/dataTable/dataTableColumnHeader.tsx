"use client";

import { DragEventHandler, memo, useCallback } from "react";

import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { TableHead } from "@/components/primitives/table";
import { SortType } from "./sortType";
import { cn } from "@/src/lib/utils";

interface Props<T> {
  index?: string;
  column?: DataTableColumn<T>;
  isTierColumn?: boolean;
  isExpandColumn?: boolean;
  isDragColumn?: boolean;
  draggable?: boolean;
  onDragStart?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrop?: DragEventHandler;
  onSort?: (columnId: number | string) => void;
  icon?: SortType;
  stickyHeader?: boolean;
  span?: number;
}

const DataTableColumnHeader = <T,>({
  index,
  column = { id: "", title: "" },
  isTierColumn,
  isExpandColumn,
  isDragColumn,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  onSort,
  icon,
  stickyHeader,
  span,
}: Props<T>) => {
  const handleSort = useCallback(
    () => onSort && onSort(column.id),
    [column, onSort]
  );

  if (isTierColumn) {
    return (
      <TableHead
        colSpan={span}
        className={`${
          stickyHeader ? "sticky top-0 bg-background z-20" : ""
        } text-nowrap`}
      >
        ردیف
      </TableHead>
    );
  }
  if (isExpandColumn || isDragColumn) {
    return (
      <TableHead
        className={` ${stickyHeader ? "sticky top-0 bg-background z-20" : ""}`}
      ></TableHead>
    );
  }

  return (
    <TableHead
      id={index}
      colSpan={span}
      /*  className={`text-nowrap  ${
        (draggable && column.id !== 0) || column.sortable
          ? "cursor-pointer"
          : ""
      } ${column.monospace ? "text-end" : ""} ${column.headerClass}
      ${stickyHeader ? "sticky top-0 bg-background z-20" : ""}
      `} */
      className={cn(
        "text-nowrap",
        `${
          (draggable && column.id !== 0) || column.sortable ? "cursor-grab" : ""
        }`,
        `${column.monospace ? "text-end" : ""}`,
        `${stickyHeader ? "sticky top-0 bg-background z-20" : ""}`,
        `${column.headerClass}`
      )}
      draggable={draggable && column.id !== 0}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={column.sortable ? handleSort : undefined}
    >
      <div
        id={index}
        //className={`${column?.thDivClass} flex items-center gap-1 justify-center `}
        className={cn(
          "flex items-center gap-1 justify-center",
          column.thDivClass
        )}
      >
        {column.title}
        {column.sortable && !icon && <ChevronsUpDown size={14} />}
        {icon &&
          column.sortable &&
          (icon === SortType.Asc ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          ))}
      </div>
    </TableHead>
  );
};

export default memo(DataTableColumnHeader) as typeof DataTableColumnHeader;
