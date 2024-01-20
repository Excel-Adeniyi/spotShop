/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Breadcrumb } from "react-bootstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FaHome } from "react-icons/fa";
import Pagination from "../../../../../components/paginantion/pagination.tsx";
import _ from "lodash";
import {
  // eslint-disable-next-line import/named

  useReactTable,
  // eslint-disable-next-line import/named
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  // eslint-disable-next-line import/named
  FilterFn,
  // eslint-disable-next-line import/named
  SortingFn,
  // eslint-disable-next-line import/named
  ColumnDef,
  flexRender,
  // eslint-disable-next-line import/named
  FilterFns,
} from "@tanstack/react-table";

import { rankItem, compareItems } from "@tanstack/match-sorter-utils";
import { fetchData, Sales } from "./makeData.tsx";
import { stringify } from "flatted";
import { DebouncedInput } from "../../../../../helper/tableFilter/debounced.tsx";
import { Filter } from "../../../../../helper/tableFilter/tableFilter.tsx";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: any;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId].itemRank!,
      rowB.columnFiltersMeta[columnId].itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export default function DailySalesTable() {
  // const rerender = React.useReducer(() => ({}), {})[1];
  const [dates, setDates] = useState({
    date1: "",
    date2: "",
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Sales, any>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },

      {
        accessorKey: "product",
        header: () => "Product",
        footer: (props) => props.column.id,
      },

      {
        accessorKey: "quantity",
        header: () => <span>Quantity</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "timeday",
        header: "Time and Date",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "action",
        header: "Action",
        footer: (props) => props.column.id,
      },
    ],

    []
  );
  const [data, setData] = useState<Sales[]>([]);
  const fetchDataAsync = async () => {
    try {
      const date2 = dates.date2;
      const date1 = dates.date1;
      // console.log("DDD", date2, date1);
      const result = await fetchData(date1, date2);
      // console.log("DDDDD", result);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataDebounced = _.debounce(fetchDataAsync, 1000);
  useEffect(() => {
    fetchDataDebounced();
  }, []);
  // console.log(data)
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Update the state object based on the name of the input field
    setDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  const tables = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  React.useEffect(() => {
    if (tables.getState().columnFilters[0]?.id === "name") {
      if (tables.getState().sorting[0]?.id !== "name") {
        tables.setSorting([{ id: "name", desc: false }]);
      }
    }
  }, [tables.getState().columnFilters[0]?.id]);

  return (
    <div className="p-2">
      <div className="row row-cols-2 d-flex justify-content-between">
        <div className="col">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
          />
        </div>
        <div className="col d-flex">
          <div>
            <label className="form-label">
              Date From:
              <input
                type="datetime-local"
                className="form-control"
                name="date1"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="col">
            <label className="form-label">
              Date To:
              <input
                type="datetime-local"
                className="form-control"
                name="date2"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <button
              className="btn btn-success"
              onClick={() => fetchDataAsync()}
            >
              Fetch
            </button>
          </div>
        </div>
      </div>
      <div className="h-2" />
      <table className="table table-striped table-hover table-bordered overflow-x-scroll">
        <thead>
          {tables.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <th key={index} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} tables={tables} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {tables.getRowModel().rows.map((row, index) => {
            return (
              <tr key={index}>
                {row.getVisibleCells().map((cell) => {
                  // Extract data from the cell or its associated column
                  const cellData = flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  );
                  // console.log(cellData);
                  // Check if cellData is a button
                  if (
                    React.isValidElement(cellData) &&
                    cellData.props.column.id === "action"
                  ) {
                    return (
                      <td key={cell.id}>
                        {/* Render the action button */}
                        <div className="row row-col-3">
                          <div className="col">
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                alert(stringify(cellData, null, 2));
                              }}
                            >
                              view
                            </button>
                          </div>
                        </div>
                      </td>
                    );
                  }

                  // if (
                  //   React.isValidElement(cellData) &&
                  //   cellData.props.column.id === "timeday"
                  // ) {
                  //   return (
                  //     <td key={cell.id}>
                  //       {/* Render the action button */}
                  //       <div className="row row-col-3">
                  //         <div className="col">
                  //           {" "}
                  //           {new Date(cellData).toL
                  //         </div>
                  //       </div>
                  //     </td>
                  //   );
                  // }

                  // Render other data if not a button
                  return <td key={cell.id}>{cellData}</td>;

                  // return <td key={cell.id}>{cellData}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="d-flex justify-content-center align-items-center gx-2">
        <div className="d-flex">
          <div className="col">
            <button
              className="border btn btn-outline-dark rounded "
              onClick={() => tables.setPageIndex(0)}
              disabled={!tables.getCanPreviousPage()}
            >
              {" << "}
            </button>
          </div>
          <div className="col">
            <button
              className="border btn btn-outline-dark rounded "
              onClick={() => tables.previousPage()}
              disabled={!tables.getCanPreviousPage()}
            >
              {" < "}
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              className="border btn btn-outline-dark rounded "
              onClick={() => tables.nextPage()}
              disabled={!tables.getCanNextPage()}
            >
              {" > "}
            </button>
          </div>
          <div className="col-6">
            <button
              className="border btn btn-outline-dark rounded "
              onClick={() => tables.setPageIndex(tables.getPageCount() - 1)}
              disabled={!tables.getCanNextPage()}
            >
              {" >> "}
            </button>
          </div>
        </div>
        <div className="col d-flex">
          <div className="col-3">
            <span className="d-flex justify-content-center g-1">
              <div>Page</div>
              <strong>
                {tables.getState().pagination.pageIndex + 1} of{" "}
                {tables.getPageCount()}
              </strong>
            </span>
          </div>

          <div className="col-3">
            <span className="d-flex ">
              <div className="col fs-6"> | Go to page:</div>
              <div className="col">
                <input
                  type="number"
                  defaultValue={tables.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    tables.setPageIndex(page);
                  }}
                  className="border  rounded w-16"
                />
              </div>
            </span>
          </div>
          <div className="col-3">
            <select
              value={tables.getState().pagination.pageSize}
              onChange={(e) => {
                tables.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>{tables.getPrePaginationRowModel().rows.length} Rows</div>
        </div>
      </div>
      <div className="d-flex mt-2 g-3">
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => fetchDataAsync()}
          >
            Refresh Data
          </button>
        </div>
      </div>
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </div>
  );
}
// A debounced input react component
