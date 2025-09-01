import { useEffect, useState } from "react";
import { fetchSalesData } from "../services/api";

export function useSalesData(interval = 5000) {
    //Define state variables
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  //Define useEffect Function
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const json = await fetchSalesData();

        // Transform to Recharts-friendly format
        const newPoint = {
          time: new Date().toLocaleTimeString(),
          price: json.bpi.USD.rate_float,
        };

        if (isMounted) {
          setData((prev) => [...prev.slice(-10), newPoint]); // keep last 10 points
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();
    const id = setInterval(loadData, interval);

    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, [interval]);

  return { data, error };
}
