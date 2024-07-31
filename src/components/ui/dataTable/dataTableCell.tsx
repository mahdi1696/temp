"use client";
import { useCallback } from "react";

import {
  numberToHumanReadable,
  percentageMapper,
  numberWithCommas,
} from "@/src/lib/utils/numUtils";

import DataTableBoldCell from "./dataTableBoldCell";
import CompleteValueTooltip from "./completeValueTooltip";
import { TableCell } from "@/components/primitives/table";
import { cn } from "@/src/lib/utils";

interface Props<T> {
  row: T;
  column: DataTableColumn<T>;
  rawContent?: any;
  defaultOnCellClick?: (row: T) => void;
}

const DataTableCell = <T,>({
  row,
  column,
  rawContent = "",
  defaultOnCellClick,
}: Props<T>) => {
  const initializeValueTooltip = (preparedValue: number, value: number) => {
    return value > 1000000 ? (
      <CompleteValueTooltip
        cellValue={preparedValue}
        tooltipValue={value}
        toNumberWithCommas={column.toNumberWithCommas}
      />
    ) : (
      preparedValue
    );
  };

  const prepareValue = (value: number, tooltipValue: number | null) => {
    let preparedValue: any = value;
    if (!value && value !== 0) {
      return "-";
    }

    if (column.toHumanReadableNumber) {
      preparedValue = numberToHumanReadable(preparedValue);
    }

    if (column.toNumberWithCommas) {
      preparedValue = numberWithCommas(preparedValue);
    }

    if (column.usePercentage) {
      preparedValue = percentageMapper(preparedValue);
    }

    if (column.useTooltip) {
      preparedValue = initializeValueTooltip(
        preparedValue,
        tooltipValue ? tooltipValue : value
      );
    }

    return preparedValue;
  };

  const handleClick = useCallback(() => {
    if (defaultOnCellClick) defaultOnCellClick(row);
    if (column.onCellClick) column.onCellClick(row);
  }, [column, defaultOnCellClick, row]);

  const getBoldCellChangingValue = (changingValue: number | "-") => {
    if (changingValue === "-") return null;
    return isNaN(changingValue) ? null : changingValue;
  };

  const renderCell = (
    value: any,
    extraStyle: any = null,
    extraClass: any = null,
    tooltipValue = null,
    monospace = false,
    columnClass?: string
  ) => {
    //when we want to add custom tooltip like text we should change tooltipValue
    const preparedValue = prepareValue(value, tooltipValue);
    if (column.boldOnChange) {
      const changingValue = column.boldOnChange(row);
      return (
        <DataTableBoldCell
          className={`text-nowrap${columnClass} ${extraClass}`}
          style={extraStyle}
          onClick={handleClick}
          changingValue={getBoldCellChangingValue(changingValue)}
        >
          {preparedValue}
        </DataTableBoldCell>
      );
    }
    return (
      <TableCell
        /*  className={`text-nowrap  group-hover:bg-red-200  ${
          monospace ? "font-mono-space text-end" : ""
        } ${columnClass} ${extraClass}`} */
        className={cn(
          "text-nowrap whitespace-nowrap",
          "transition-colors group-hover:bg-muted",
          `${monospace ? "font-mono-space text-end" : ""}`,
          `${columnClass}`,
          `${extraClass}`
        )}
        style={extraStyle}
        onClick={handleClick}
      >
        {preparedValue}
      </TableCell>
    );
  };

  if (rawContent) {
    return renderCell(rawContent);
  }

  let value = "-";

  if (column?.content) {
    return renderCell(
      column.content(row),
      column.extraStyle ? column.extraStyle(row) : {},
      column.extraClass ? column.extraClass(row) : "",
      null,
      column.monospace ? column.monospace : false,
      column.columnsClass
    );
  }

  return renderCell(value);
};

export default DataTableCell;
