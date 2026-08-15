import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/home.jsx";
import Solutions from "./pages/solution/solutions.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/solutions" element={<Solutions />} />
    </Routes>
  );
}

export default App;