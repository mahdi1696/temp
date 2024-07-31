import { useCallback, memo, ComponentType, DragEvent, MouseEvent } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";

import { SortType } from "./sortType";

import DataTableColumnHeader from "./dataTableColumnHeader";
//import DataTableMenu from "./dataTableMenu";
import DataTableRow from "./dataTableRow";
import { groupBy } from "lodash";

type HandleMove = ({
  sourceIndex,
  destinationIndex,
}: {
  sourceIndex: number;
  destinationIndex: number;
}) => void;

interface Props<T> {
  items: T[];
  footer?: ComponentType<any>;
  columns: DataTableColumn<T>[];
  pageIndex?: number;
  pageSize?: number;
  enableColumnDrag?: boolean;
  enableRowDrag?: boolean;
  enableRowExpand?: boolean;
  enableTierShow?: boolean;
  enableSort?: boolean;
  sortColumnId?: string | number;
  sortType?: SortType;
  stickyHeader?: boolean;
  handleSort?: (columnId: number | string) => void;
  handleMoveColumn: HandleMove;
  handleMoveItem: HandleMove;
  tableWrapperClasses?: string;
  tableClassName?: string;
  extraRowClasses?: string;
  showOnHover?: (row: T) => JSX.Element;
  onRowClick?: (row: T, e: MouseEvent<HTMLTableRowElement>) => void;
  onRefresh?: () => void;
  defaultOnCellClick?: (row: T) => void;
  dragCompleteCallback?: (dragged: T, dropped: T) => void;
}

const DataTable = <T,>({
  items,
  footer: Footer,
  columns,
  pageIndex = 0,
  pageSize = 10,
  enableColumnDrag,
  enableRowDrag,
  enableRowExpand,
  enableTierShow,
  enableSort,
  sortColumnId,
  sortType,
  stickyHeader,
  handleSort,
  handleMoveColumn,
  handleMoveItem,
  tableWrapperClasses = "",
  tableClassName = "",
  extraRowClasses,
  showOnHover,
  onRowClick,
  onRefresh,
  defaultOnCellClick,
  dragCompleteCallback = () => {},
}: Props<T>) => {
  const getHeaderIcon = (header: DataTableColumn<T>) => {
    if (enableSort && sortColumnId === header.id) {
      return sortType;
    }
  };

  const handleColumnDragStart = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => {
      e.dataTransfer.setData("colIdx", (e.target as HTMLTableCellElement).id);
    },
    []
  );

  const handleColumnDrop = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => {
      const droppedColIdx = (e.target as HTMLTableCellElement).id;
      const draggedColIdx = e.dataTransfer.getData("colIdx");

      if (draggedColIdx && droppedColIdx && draggedColIdx != droppedColIdx) {
        handleMoveColumn({
          sourceIndex: Number(draggedColIdx),
          destinationIndex: Number(droppedColIdx),
        });
      }
    },
    [handleMoveColumn]
  );

  const handleRowDragStart = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => {
      e.dataTransfer.setData("rowIdx", (e.target as HTMLTableCellElement).id);
    },
    []
  );

  const handleRowDrop = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => {
      const droppedRowIdx = (e.target as HTMLTableCellElement).id;
      const draggedRowIdx = e.dataTransfer.getData("rowIdx");

      if (draggedRowIdx && droppedRowIdx && draggedRowIdx != droppedRowIdx) {
        dragCompleteCallback(
          items[parseInt(draggedRowIdx)],
          items[parseInt(droppedRowIdx)]
        );
        handleMoveItem({
          sourceIndex: Number(draggedRowIdx),
          destinationIndex: Number(droppedRowIdx),
        });
      }
    },
    [handleMoveItem, dragCompleteCallback, items]
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => e.preventDefault(),
    []
  );

  const headerGroup = groupBy(columns, (it) => it.headerGroup);
  let group = headerGroup.true;
  let headers = headerGroup.undefined;
  return (
    <Table
      sticky={stickyHeader}
      className={tableClassName}
      tableWrapperClassName={tableWrapperClasses}
    >
      <TableHeader>
        {group?.map((column, index) => (
          <TableRow key={index}>
            <DataTableColumnHeader<T>
              key={column.id}
              index={index.toString()}
              column={column}
              draggable={enableColumnDrag}
              onDragStart={handleColumnDragStart}
              onDragOver={handleDragOver}
              onDrop={handleColumnDrop}
              onSort={handleSort}
              icon={getHeaderIcon(column)}
              stickyHeader={stickyHeader}
              span={column.span}
            />
          </TableRow>
        ))}
        <TableRow>
          {enableRowDrag && (
            <DataTableColumnHeader stickyHeader={stickyHeader} isDragColumn />
          )}
          {enableRowExpand && (
            <DataTableColumnHeader stickyHeader={stickyHeader} isExpandColumn />
          )}
          {enableTierShow && (
            <DataTableColumnHeader stickyHeader={stickyHeader} isTierColumn />
          )}
          {headers?.map((column, index) => (
            <DataTableColumnHeader<T>
              key={column.id}
              index={index.toString()}
              column={column}
              draggable={enableColumnDrag}
              onDragStart={handleColumnDragStart}
              onDragOver={handleDragOver}
              onDrop={handleColumnDrop}
              onSort={handleSort}
              icon={getHeaderIcon(column)}
              stickyHeader={stickyHeader}
              span={column.span}
            />
          ))}
          {/* {onRefresh && <DataTableMenu onRefresh={onRefresh} />} */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item, rowIndex) => (
          <DataTableRow<T>
            key={rowIndex}
            rowIndex={rowIndex}
            headers={columns}
            expandable={enableRowExpand}
            showOnHover={showOnHover}
            page={pageIndex}
            pageSize={pageSize}
            enableTierShow={enableTierShow}
            item={item}
            onRowClick={onRowClick}
            defaultOnCellClick={defaultOnCellClick}
            draggable={enableRowDrag}
            onDragStart={handleRowDragStart}
            onDragOver={handleDragOver}
            onDrop={handleRowDrop}
            extraRowClasses={extraRowClasses}
          />
        ))}
      </TableBody>
      {Footer && <Footer data={items} />}
    </Table>
  );
};

//export default memo(DataTable) as typeof DataTable;
export default DataTable;
