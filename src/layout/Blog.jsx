import { useEffect, useState } from "react";

export default function Blog() {
  // State to store fetched articles
  const [articles, setArticles] = useState([]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define an async function inside useEffect to fetch articles
    const fetchArticles = async () => {
      try {
        // Fetch finance-related articles from NewsAPI
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=finance&apiKey=YOUR_API_KEY`
        );

        // Parse the response JSON
        const data = await res.json();

        // Store articles in state (use empty array as fallback if undefined)
        setArticles(data.articles || []);
      } catch (error) {
        // Log errors in case API call fails
        console.error("Error fetching articles:", error);
      } finally {
        // Stop the loading spinner once API call finishes
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchArticles();
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Show a loading message while fetching data
  if (loading) {
    return <p className="text-center text-lg">Loading articles...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Finance Articles</h1>

      {/* If no articles found, show a fallback message */}
      {articles.length === 0 ? (
        <p>No articles available.</p>
      ) : (
        <ul className="space-y-4">
          {/* Loop through articles and display title with clickable link */}
          {articles.map((article, index) => (
            <li key={index} className="border-b pb-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
