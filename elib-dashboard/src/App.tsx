import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
<>
    <Routes>
      <Route path="/" element={<h1 className="text-2xl font-bold">Dashboard Home</h1>} />
    </Routes>
</>    
  );
}