import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
import Watchlist from "./pages/watchlist/Watchlist";
import SeeAll from "./pages/SeeAll/SeeAll";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/film/:id" element={<DetailFilm />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/see-all" element={<SeeAll />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
