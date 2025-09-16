"use client"

// Define columns for expenditure table
export const expenditureColumns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount ($)",
    cell: ({ row }) => (
      <span className="font-medium text-green-600">
        {row.original.amount}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "method",
    header: "Payment Method",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
]
