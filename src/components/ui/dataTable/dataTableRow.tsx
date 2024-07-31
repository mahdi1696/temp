import {
  useState,
  useCallback,
  memo,
  DragEventHandler,
  MouseEvent,
} from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";

import DataTableCell from "./dataTableCell";
import { ChevronLeft, Grip } from "lucide-react";

interface Props<T> {
  rowIndex: number;
  headers: DataTableColumn<T>[];
  expandable?: boolean;
  showOnHover?: (row: T) => JSX.Element;
  page: number;
  pageSize: number;
  enableTierShow?: boolean;
  item: any;
  onRowClick?: (row: T, e: MouseEvent<HTMLTableRowElement>) => void;
  defaultOnCellClick?: (row: T) => void;
  draggable?: boolean;
  onDragStart?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrop?: DragEventHandler;
  extraRowClasses?: string;
}

const DataTableRow = <T,>({
  rowIndex,
  headers,
  expandable,
  showOnHover,
  page,
  pageSize,
  enableTierShow,
  item,
  onRowClick,
  defaultOnCellClick,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
  extraRowClasses = "",
}: Props<T>) => {
  const [expand, setExpand] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleExpandIconClick = useCallback(() => setExpand(!expand), [expand]);
  const handleOnRowClick = useCallback(
    (e: MouseEvent<HTMLTableRowElement>) => {
      if ((e.target as HTMLTableRowElement).classList.contains("modal")) return;
      onRowClick!(item, e);
    },
    [onRowClick, item]
  );

  return (
    <>
      <TableRow
        className={`group ${extraRowClasses}`}
        onMouseEnter={showOnHover ? handleMouseEnter : undefined}
        onMouseLeave={showOnHover ? handleMouseLeave : undefined}
        onClick={onRowClick ? handleOnRowClick : undefined}
      >
        <>
          {draggable && (
            <TableCell
              id={rowIndex.toString()}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <Grip
                id={rowIndex.toString()}
                name="drag"
                size={13}
                className="clickable"
              />
            </TableCell>
          )}
          {expandable && (
            <TableCell
              onClick={item.expandContent ? handleExpandIconClick : undefined}
            >
              {
                <ChevronLeft
                  size={14}
                  className={`clickable transform ${
                    expand ? "rotate-[270deg]" : "rotate-0"
                  }`}
                />
              }
            </TableCell>
          )}
          {enableTierShow && (
            <DataTableCell<T>
              row={{} as T}
              column={{ id: 0, title: "" }}
              rawContent={rowIndex + 1 + (page - 1) * pageSize}
              defaultOnCellClick={defaultOnCellClick}
            />
          )}
          {headers
            .filter((it) => !it.headerGroup)
            .map((column, columnIndex) => (
              <DataTableCell<T>
                key={columnIndex}
                row={item}
                column={column}
                defaultOnCellClick={defaultOnCellClick}
              />
            ))}
          {showOnHover && isHovered && showOnHover(item)}
        </>
      </TableRow>
      {expandable && expand && (
        <TableRow className="hover:bg-transparent">
          <TableCell className="bg-transparent " colSpan={100}>
            {item.expandContent}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default memo(DataTableRow) as typeof DataTableRow;
