import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

/*
  file imports
  */
  import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table.jsx";
  import { Input } from "@/components/ui/input.jsx";
  import { Button } from "@/components/ui/button.jsx";

export default function DataTable({ data }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // columns - memoize
  const columns = useMemo(
    () => [
      {
        accessorKey: "date",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Date {column.getIsSorted() === "asc" ? "▲" : column.getIsSorted() === "desc" ? "▼" : ""}
          </button>
        ),
        cell: ({ getValue }) => {
          const d = getValue();
          return <div className="text-sm">{d}</div>;
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => <div className="truncate max-w-[320px]">{getValue()}</div>,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => <div className="text-sm">{getValue()}</div>,
      },
      {
        accessorKey: "method",
        header: "Method",
        cell: ({ getValue }) => <div className="text-sm">{getValue()}</div>,
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <div className="text-right">
            <button onClick={() => column.toggleSorting()}>
              Amount {column.getIsSorted() === "asc" ? "▲" : column.getIsSorted() === "desc" ? "▼" : ""}
            </button>
          </div>
        ),
        cell: ({ getValue }) => {
          const n = Number(getValue() ?? 0);
          // digit-by-digit correctness: use Intl.NumberFormat
          return <div className="text-right">{new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n)}</div>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button onClick={() => alert(`Open row ${row.original.id}`)} size="sm">Open</Button>
          </div>
        ),
      },
    ],
    []
  );

  // make the table
  const table = useReactTable({
    data: data ?? [],
    columns,
    state: { globalFilter, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
  });

  // Totals (over all data)
  const totalAll = (data ?? []).reduce((s, r) => s + Number(r.amount ?? 0), 0);
  // Totals (on current page)
  const totalPage = table.getRowModel().rows.reduce((s, row) => s + Number(row.original.amount ?? 0), 0);

  return (
    <div className="w-full bg-white/70 dark:bg-gray-900/60 dark:text-amber-50 p-4 rounded-lg shadow">
      {/* Search */}
      <div className="flex items-center justify-between mb-4">
        <Input        
          placeholder="Search description..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm text-black dark:text-white dark:placeholder:text-gray-100"
        />
        <div className="text-sm">
          Total (all): <strong>{new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(totalAll)}</strong>
        </div>
      </div>

      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination + page totals */}
      <div className="flex items-center justify-between gap-2 mt-4">
        <div className="flex items-center gap-2">
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
          <span className="text-sm">
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of <strong>{table.getPageCount()}</strong>
          </span>
        </div>

        <div className="text-sm">
          Page total: <strong>{new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(totalPage)}</strong>
        </div>
      </div>
    </div>
  );
}
