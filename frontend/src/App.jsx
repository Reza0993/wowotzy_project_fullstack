import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import DetailFilm from "./pages/DetailFilm/DetailFilm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/film/:id" element={<DetailFilm />} />
    </Routes>
  );
}

export default App;