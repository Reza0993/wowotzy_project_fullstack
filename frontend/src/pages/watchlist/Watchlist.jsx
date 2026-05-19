import { useEffect, useState } from "react";

import API from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import BottomNav from "../../components/BottomNav/BottomNav";
import "./Watchlist.css";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("watchlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist(res.data.data);
      } catch (err) {
        console.error("Gagal ambil Watchlist:", err);
      }
    };
    fetchWatchlist();
  }, []);

  // Fungsi helper untuk mendeteksi tipe URL gambar (eksternal vs lokal)
  const getImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `http://localhost:3000/uploads/${url}`;
  };

  return (
    <div className="home min-h-screen relative bg-gradient-to-b from-[#1a080a] to-[#0a0506] ">
      <Navbar />
      <div className="home-content flex flex-col gap-8 mt-[-45px] relative z-10 pb-44">
        <h1 className="text-white text-2xl font-bold text-center">
          🎬 Daftar Tonton Saya
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {watchlist.length > 0 ? (
            watchlist.map((film) => (
              <div
                key={film.id_watchlist}
                className="bg-[#1a080a]/80 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <img
                  src={getImageUrl(film.foto_url)}
                  alt={film.judul}
                  className="w-full h-48 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4">
                  <h2 className="text-white font-semibold text-lg">
                    {film.judul}
                  </h2>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {film.deskripsi}
                  </p>
                  <button
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        await API.delete(`/watchlist/${film.id_watchlist}`, {
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        setWatchlist((prev) =>
                          prev.filter(
                            (f) => f.id_watchlist !== film.id_watchlist,
                          ),
                        );
                      } catch (err) {
                        console.error("Gagal hapus:", err);
                      }
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              Belum ada film di watchlist.
            </p>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
export default Watchlist;
