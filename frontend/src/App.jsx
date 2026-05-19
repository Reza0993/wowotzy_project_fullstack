import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
import Watchlist from "./pages/watchlist/Watchlist";
import SeeAll from "./pages/SeeAll/SeeAll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/film/:id" element={<DetailFilm />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/see-all" element={<SeeAll />} />
    </Routes>
  );
}

export default App;
