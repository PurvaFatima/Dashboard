// src/pages/Expenditure.jsx

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ✅ Example placeholder API (replace with your backend endpoint)
const API_URL = "https://jsonplaceholder.typicode.com/posts"

const Expenditure = () => {
  const [expenditures, setExpenditures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch expenditure data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Example fetch (replace with your real API call)
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error("Failed to fetch expenditure data")

        const data = await response.json()

        // For demo purposes: map API response into our expenditure table format
        const mappedData = data.slice(0, 5).map((item, index) => ({
          id: index + 1,
          category: `Category ${index + 1}`,
          amount: Math.floor(Math.random() * 500) + 50, // fake amount
          date: `2025-09-${String(index + 1).padStart(2, "0")}`,
        }))

        setExpenditures(mappedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4 text-foreground">
        Expenditure Table
      </h1>

      {/* Loading / Error States */}
      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">Error: {error}</p>}

      {/* Expenditure Table */}
      {!loading && !error && (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount ($)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {expenditures.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="font-medium">
                    ${item.amount}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default Expenditure
