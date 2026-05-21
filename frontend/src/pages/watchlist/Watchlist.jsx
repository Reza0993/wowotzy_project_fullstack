import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";

import "./Watchlist.css";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWatchlist(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil watchlist:", err);
    }
  };

  const getImageUrl = (url) => {
    if (!url) {
      return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300";
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `http://localhost:3000/uploads/${url}`;
  };

  return (
    <div className="watchlist-page">
      <Navbar />

      <div className="watchlist-container">
        <div className="watchlist-header">
          <div className="section-line"></div>

          <h1 className="watchlist-title">Daftar Saya</h1>
        </div>

        <div className="watchlist-section">
          <div className="section-left">
            <div className="section-line small"></div>

            <h2 className="section-title">Film Watchlist</h2>
          </div>
        </div>

        {watchlist.length > 0 ? (
          <div className="movie-grid">
            {watchlist.map((film) => (
              <Link
                to={`/film/${film.id_film}`}
                key={film.id_watchlist}
                className="movie-card"
              >
                <div className="movie-image-wrapper">
                  <img
                    src={getImageUrl(film.foto_url)}
                    alt={film.judul}
                    className="movie-image"
                    referrerPolicy="no-referrer"
                  />

                  <div className="movie-overlay">
                    <span className="play-text">▶ Lihat Detail</span>
                  </div>
                </div>

                <div className="movie-content">
                  <h3 className="movie-title">{film.judul}</h3>

                  <p className="movie-description">{film.deskripsi}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-watchlist">Belum ada film di watchlist 🎬</div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
