import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
import Watchlist from "./pages/watchlist/Watchlist";
import SeeAll from "./pages/SeeAll/SeeAll";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import History from "./pages/History/history";
import Dasboard from "./pages/DasboardAdmin/Dasboard/Dasboard";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import KelolaFilm from "./pages/DasboardAdmin/Films/KelolaFilm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/film/:id" element={<DetailFilm />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/see-all" element={<SeeAll />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/history" element={<History />} />
      <Route path="/dasboardAdmin/dasboard" element={<Dasboard />} />
      <Route path="/dasboardAdmin/films" element={<KelolaFilm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}

export default App;
