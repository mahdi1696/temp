"use client";
import { useState, useEffect, MouseEvent, useCallback } from "react";
import { ComponentType } from "react";

import Pagination from "./pagination";

import { SortType } from "./sortType";

import _, { orderBy } from "lodash";

import DataTable from "./dataTable";
import DataTableSelectSize from "./dataTableSelectSize";

const LOCALE = "locale";
export const defaultOnlineFetchDataPageSize = 1000;
export const defaultOfflineFetchDataPageSize = 9999;

export function paginate(items: any, pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export const getColumnById = <T,>(
  id: string | number,
  columns: DataTableColumn<T>[]
) => {
  return columns.find((column) => column.id === id);
};

/**
 * Returns an array of columns that are visible based on the provided columnsConfig object, while reordering them according to the columnsConfig order.
 *
 * @param {Object<string, boolean>} columnsConfig - An object representing the visibility criteria and order of columns. The keys are column titles, and the values are booleans indicating whether the column is visible or not.
 * @param {Array<{ title: string }>} columns - An array of objects representing the columns.
 * @returns {Array<{ title: string }>} - An array of objects representing the visible columns, reordered based on the columnsConfig.
 *
 * @example
 *
 * const config = {
 *  colOne : true,
 *  colFour : true,
 *  colThree : true,
 *  colTwo : false
 * }
 *
 * const columns =[
 *  {id : 1 , title : "colOne "},
 *  {id : 2 , title : "colThree"},
 *  {id : 3 , title : "colFour"},
 *  {id : 4 , title : "colTwo "},
 * ]
 *
 * const visibleColumns = getVisibleColumns(config, columns);
 * console.log(visibleColumns);
 *
 * //output :
 * // [
 * // {id : 1 , title : "colOne "},
 * // {id : 4 , title : "colTwo "},
 * // {id : 3 , title : "colFour"},
 * // ]
 *
 */
const getVisibleColumns = <T,>(
  columnsConfig: object,
  columns: DataTableColumn<T>[]
) => {
  if (!columnsConfig) return columns;
  const visibleColumns = columns.filter(
    (column) => columnsConfig[column.title as keyof typeof columnsConfig]
  );

  const _columns: DataTableColumn<T>[] = [];
  Object.keys(columnsConfig).forEach((key) => {
    const column = visibleColumns.find((col) => col.title === key);
    if (column) {
      _columns.push(column);
    }
  });
  return _columns;
};

export function moveItemInArray(
  array: any[],
  sourceIndex: number,
  destinationIndex: number
): any[] {
  const tempArr = [...array];
  tempArr.splice(destinationIndex, 0, tempArr.splice(sourceIndex, 1)[0]);
  return tempArr;
}

interface Props<T> {
  initParams?: {
    filter?: any;
    pageNumber?: number;
    pageSize?: number;
    sort?: string;
  };

  disabledFilterItems?: { key: string; value: boolean }[];
  enableTable?: boolean;
  disableInitialization?: boolean;
  enablePagination?: boolean;
  enableTableSize?: boolean;
  enableColumnDrag?: boolean;
  enableRowDrag?: boolean;
  onlinePagination?: boolean;
  enableTierShow?: boolean;
  enableSort?: boolean;
  stickyHeader?: boolean;
  showOnHover?: (row: T) => JSX.Element;
  columnsConfig?: { [key: string]: boolean };
  onColumnOrderChange?: (columns: { [key: string]: boolean }) => void;
  enableRowExpand?: boolean;
  defaultSize?: number;
  defaultSortColumnId?: string | number;
  defaultSortType?: SortType;
  loading?: boolean;
  columns: DataTableColumn<T>[];
  content?: {
    items?: T[] | null;
  } & Partial<PaginationInfo>;
  footer?: ComponentType<any>;
  extraFilterClasses?: string;
  tableWrapperClasses?: string;
  extraTableClasses?: string;
  extraRowClasses?: string;
  tableSizeClassName?: string;
  onRowClick?: (row: T, e: MouseEvent<HTMLTableRowElement>) => void;
  defaultOnCellClick?: (row: T) => void;
  handleFetch?: (payload: any) => void;
  dragCompleteCallback?: (dragged: T, dropped: T) => void;
}

// this component is used to fetch data and show data in a table and filter the data.
const DataTableContainer = <T,>({
  /**
   initParams:
   Initial parameters for the DataTableContainer component.
   Properties:
   filter: Initial filter values to be applied.
   pageNumber: Initial page index.
   pageSize: Initial page size.
   sort: Initial sort configuration in the format "columnId-sortType".
   Note: These parameters are used to initialize the state of the DataTableContainer component and control the initial filtering, pagination, and sorting settings.
  */
  initParams,
  //filter config

  //table config
  enableTable = true, //  make true if you want to show table (this is here for situations when you just want to show filter or something else)
  disableInitialization, // make this true if you don't want this component to call fetchData callback
  enablePagination, // make true if you want table to have
  enableTableSize, // make this true if you want to show DataTableSelectSize
  enableColumnDrag, // make true if you want columns to be draggable
  enableRowDrag, // make true if you want rows to be draggable
  onlinePagination, // make this true if you want to use online pagination (to use this option, enable pagination should be true)
  enableTierShow, // make this true if you want to show a column  for tiers
  enableSort, // make this true if you want the be sortable by columns
  showOnHover, // this should be a callback that returns some content that you want to show when hovering rows (optional)
  /**
   An object that represents the visibility and order of columns in the table.
   The properties in the object indicate the columns to be displayed, where the key is the column title and the value is a boolean indicating its visibility.
   The order of the properties in the object determines the order of the columns in the table.
 */
  columnsConfig,
  onColumnOrderChange, //It gets called when the column order is changed.
  enableRowExpand,
  // default values
  defaultSize = defaultOnlineFetchDataPageSize, // default number of page size
  defaultSortColumnId,
  defaultSortType = SortType.Desc,
  //data
  stickyHeader,
  loading,
  columns,
  content,
  footer,
  //classes
  extraFilterClasses,
  extraTableClasses,
  tableWrapperClasses,
  extraRowClasses,
  tableSizeClassName,
  //handlers
  onRowClick,
  defaultOnCellClick,
  dragCompleteCallback,
  handleFetch, // this should be a callback that fetches data based on one object param containing pageSize, pageNumber, etc. this can be used for initialization, onlinePagination, sort, etc
}: Props<T>) => {
  type items = Props<T>["content"];
  type ss = Required<items>;
  //type aa =ss["items"]
  // filter state
  const [filterValues, setFilterValues] = useState(initParams?.filter ?? {});
  const [isFilterActive, setIsFilterActive] = useState(false);
  //table state
  const [pageIndex, setPageIndex] = useState(initParams?.pageNumber ?? 1); // page index is a number between 1 and totalPagesCount
  const [pageSize, setPageSize] = useState(initParams?.pageSize ?? defaultSize);
  const [sortColumnId, setSortColumnId] = useState(
    initParams?.sort?.split("-")[0] ?? defaultSortColumnId
  );
  const [sortType, setSortType] = useState<SortType | null>(
    (initParams?.sort?.split("-")[1] as SortType) ?? defaultSortType
  );

  const [displayedItems, setDisplayedItems] = useState(content?.items);
  const [displayedColumns, setDisplayedColumns] = useState(
    columnsConfig ? getVisibleColumns(columnsConfig, columns) : columns
  );

  const fetchData = useCallback(
    (defaultPayload?: any) => {
      const payload: Record<string, any> = {};

      if (onlinePagination) {
        payload.pageNumber = defaultPayload?.pageIndex || pageIndex;
        payload.pageSize = defaultPayload?.pageSize || pageSize;

        if (sortColumnId) payload.sort = sortColumnId + "-" + sortType;
        if (defaultPayload?.sort !== undefined)
          payload.sort = defaultPayload?.sort;
      } else {
        payload.pageSize = defaultOfflineFetchDataPageSize; // this number is here to get all the data
      }
      handleFetch?.(payload);
    },
    [handleFetch, onlinePagination, pageIndex, pageSize, sortColumnId, sortType]
  );

  useEffect(() => {
    // initialize data
    if (!disableInitialization) {
      fetchData();
    }
  }, [disableInitialization, fetchData]);

  const offlineSort = useCallback(
    (
      rows: T[] | null | undefined,
      sortColumnId: string | number | undefined,
      sortType: SortType | null
    ) => {
      if (!sortType) return rows;
      if (!rows || !sortColumnId) return rows;

      const sortColumn = getColumnById(sortColumnId, columns);

      if (sortColumn) {
        if (sortColumn?.sortType === LOCALE) {
          const sortedData = [...rows].sort((a, b) => {
            const compare = sortColumn
              ?.getValue?.(a)
              .toString()
              .localeCompare(sortColumn?.getValue(b).toString());
            return compare || -1;
          });
          return sortType === SortType.Asc ? sortedData : sortedData.reverse();
        }
        return orderBy(
          rows,
          [
            (row) =>
              sortColumn.getValue
                ? sortColumn.getValue(row)
                : sortColumn.content!(row),
          ],
          [sortType]
        );
      }
      return rows;
    },
    [columns]
  );

  useEffect(() => {
    if (onlinePagination) {
      setDisplayedItems(content?.items);
    } else {
      setDisplayedItems(
        paginate(
          offlineSort(content?.items, sortColumnId, sortType),
          pageIndex,
          pageSize
        )
      );
    }
  }, [
    content?.items,
    offlineSort,
    onlinePagination,
    pageIndex,
    pageSize,
    sortColumnId,
    sortType,
  ]);

  //===
  useEffect(() => {
    if (columnsConfig) {
      setDisplayedColumns(getVisibleColumns(columnsConfig, columns));
    } else {
      setDisplayedColumns(columns);
    }
  }, [columns, columnsConfig]);

  //====
  useEffect(() => {
    if (!onlinePagination) {
      setDisplayedItems(paginate(content?.items, pageIndex, pageSize));
    }
  }, [content?.items, onlinePagination, pageIndex, pageSize]);

  const handleMoveColumn = ({
    sourceIndex,
    destinationIndex,
  }: {
    sourceIndex: number;
    destinationIndex: number;
  }) => {
    const newColumns = moveItemInArray(
      displayedColumns,
      sourceIndex,
      destinationIndex
    );

    if (columnsConfig && onColumnOrderChange) {
      const sourceTitle = displayedColumns[sourceIndex].title;
      const destinationTitle = displayedColumns[destinationIndex].title;
      let cols: Record<string, boolean> = {};
      let tempKeys = Object.keys(columnsConfig);
      const configSourceIndex = tempKeys.indexOf(sourceTitle);
      const configDestinationIndex = tempKeys.indexOf(destinationTitle);
      tempKeys = moveItemInArray(
        tempKeys,
        configSourceIndex,
        configDestinationIndex
      );
      tempKeys.map((key) => (cols[key] = columnsConfig[key]));
      onColumnOrderChange(cols);
    }

    setDisplayedColumns(newColumns);
  };

  const handleMoveItem = ({
    sourceIndex,
    destinationIndex,
  }: {
    sourceIndex: number;
    destinationIndex: number;
  }) => {
    setDisplayedItems(
      moveItemInArray(displayedItems!!, sourceIndex, destinationIndex)
    );
  };

  const handleSort = (columnId: string | number) => {
    if (enableSort) {
      let tempSortColumnId = columnId;
      let tempSortType: SortType | null = SortType.Asc;

      if (sortColumnId === columnId) {
        if (sortType === SortType.Asc) tempSortType = SortType.Desc;
        else if (sortType === SortType.Desc) tempSortType = null;
      }

      setSortColumnId(tempSortColumnId);
      setSortType(tempSortType);
      setPageIndex(1);

      if (onlinePagination) {
        fetchData({
          pageIndex: 1,
          sort: tempSortType ? tempSortColumnId + "-" + tempSortType : null,
        });
      } else {
        setDisplayedItems(
          offlineSort(content?.items, tempSortColumnId, tempSortType)
        );
      }
    }
  };

  const renderTable = () => {
    if (!enableTable) return null;

    if (loading) return <p>loading</p>;

    if (!displayedItems || displayedItems?.length === 0) {
      if (isFilterActive) return <p>no data fund</p>;

      return <p>no item fund</p>;
    }

    return (
      <>
        {enablePagination && enableTableSize && (
          <DataTableSelectSize
            className={tableSizeClassName}
            pageSize={pageSize}
            onChange={(pageSize) => {
              setPageIndex(1);
              setPageSize(pageSize);
              if (onlinePagination) fetchData({ pageSize, pageIndex: 1 });
            }}
          />
        )}
        <DataTable<T>
          items={displayedItems}
          columns={displayedColumns}
          stickyHeader={stickyHeader}
          footer={footer}
          pageIndex={pageIndex}
          pageSize={pageSize}
          enableColumnDrag={enableColumnDrag}
          enableRowDrag={enableRowDrag}
          enableTierShow={enableTierShow}
          enableSort={enableSort}
          sortColumnId={sortColumnId}
          sortType={sortType as SortType}
          showOnHover={showOnHover}
          handleSort={handleSort}
          handleMoveColumn={handleMoveColumn}
          handleMoveItem={handleMoveItem}
          tableWrapperClasses={tableWrapperClasses}
          tableClassName={extraTableClasses}
          extraRowClasses={extraRowClasses}
          onRowClick={onRowClick}
          onRefresh={fetchData}
          defaultOnCellClick={defaultOnCellClick}
          enableRowExpand={enableRowExpand}
          dragCompleteCallback={dragCompleteCallback}
        />
        {enablePagination && content?.items?.length && (
          <Pagination
            pagesCount={
              onlinePagination
                ? content?.totalPages!
                : Math.ceil(content.items.length / pageSize)
            }
            currentPage={pageIndex}
            onPageChange={(pageIndex) => {
              setPageIndex(pageIndex);
              if (onlinePagination) fetchData({ pageIndex });
            }}
          />
        )}
      </>
    );
  };

  return <>{renderTable()}</>;
};

export default DataTableContainer;
