import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";

export default function Expenditure() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // Sample API - replace with your real endpoint if you have one
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=20");
        const posts = await res.json();

        const categories = ["Food", "Transport", "Groceries", "Bills", "Entertainment"];
        const methods = ["Cash", "Card", "UPI", "Transfer"];

        // Map posts -> expense rows
        const expenses = posts.map((p, idx) => {
          // create a stable-ish date: today - id days
          const date = new Date();
          date.setDate(date.getDate() - p.id);
          return {
            id: String(p.id),
            date: date.toISOString().slice(0, 10),
            description: p.title,
            amount: Number(((p.id % 50) + 10) + (idx % 3) * 0.5).toFixed(2), // deterministic-ish sample amount
            category: categories[p.userId % categories.length],
            method: methods[p.userId % methods.length],
            notes: p.body.slice(0, 80),
          };
        });

        setData(expenses);
      } catch (err) {
        console.error("Failed to fetch sample data", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Expenditure</h1>
      {loading ? <div>Loading...</div> : <DataTable data={data} />}
    </div>
  );
}
