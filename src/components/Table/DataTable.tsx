import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type {
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, Columns } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setColumnVisibility } from '../../store/slices/uiSlice';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  pageIndex: number;
  pageSize: number;
  setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
  isLoading: boolean;
  rowSelection: Record<string, boolean>;
  setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  sorting,
  setSorting,
  pageIndex,
  pageSize,
  setPagination,
  isLoading,
  rowSelection,
  setRowSelection,
}: DataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const columnVisibility = useAppSelector((state) => state.ui.columnVisibility);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      rowSelection,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === 'function') {
        dispatch(setColumnVisibility(updater(columnVisibility)));
      } else {
        dispatch(setColumnVisibility(updater));
      }
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div className="space-y-4">
      {/* Table Actions Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Object.keys(rowSelection).length > 0 && (
            <div className="text-sm text-blue-400 font-medium px-3 py-1.5 bg-blue-500/10 rounded-lg">
              {Object.keys(rowSelection).length} row(s) selected
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors"
          >
            <Columns size={16} />
            View
            <ChevronDown size={14} />
          </button>
          
          {isColumnDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl z-50 p-2">
              <div className="text-xs font-semibold text-gray-500 mb-2 px-2 uppercase tracking-wider">Toggle Columns</div>
              {table.getAllLeafColumns().map((column) => {
                return (
                  <label
                    key={column.id}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-[#1A1A1A]"
                    />
                    <span className="text-sm text-gray-300 capitalize">{column.id}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="rounded-xl border border-white/5 bg-[#1A1A1A] overflow-hidden">
        <div className="overflow-x-auto">
          <table 
            className="w-full text-left text-sm text-gray-400"
            role="grid"
            aria-label="Orders Data Table"
          >
            <thead className="text-xs text-gray-400 uppercase bg-black/20 border-b border-white/5">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        role="columnheader"
                        aria-sort={
                          header.column.getIsSorted() === 'asc' ? 'ascending' : 
                          header.column.getIsSorted() === 'desc' ? 'descending' : 'none'
                        }
                        className={cn(
                          "px-4 py-3 font-medium tracking-wider",
                          header.column.getCanSort() ? "cursor-pointer select-none hover:bg-white/5 transition-colors" : ""
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <ArrowUpDown size={14} className={cn(
                                "transition-colors",
                                header.column.getIsSorted() ? "text-blue-500" : "text-gray-600"
                              )} />
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: pageSize }).map((_, i) => (
                  <tr key={i} role="row" className="border-b border-white/5 last:border-0">
                    {columns.map((_, j) => (
                      <td key={j} role="gridcell" className="px-4 py-4">
                        <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" aria-hidden="true"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    role="row"
                    aria-selected={row.getIsSelected()}
                    className={cn(
                      "border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors",
                      row.getIsSelected() && "bg-blue-500/5 hover:bg-blue-500/10"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} role="gridcell" className="px-4 py-3 text-gray-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Rows per page</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="bg-[#1A1A1A] border border-white/10 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 focus:outline-none"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            Page <span className="font-medium text-white">{table.getState().pagination.pageIndex + 1}</span> of{' '}
            <span className="font-medium text-white">{table.getPageCount()}</span>
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#1A1A1A] text-sm text-gray-300 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#1A1A1A] text-sm text-gray-300 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
