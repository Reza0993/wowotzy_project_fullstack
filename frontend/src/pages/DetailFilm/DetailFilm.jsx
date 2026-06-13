import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import API from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./DetailFilm.css";

function DetailFilm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    getDetailMovie();
    checkWatchlist();
    recordHistory();
  }, []);

  async function getDetailMovie() {
    try {
      const response = await API.get(`/api/film/${id}`);
      setMovie(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkWatchlist() {
    try {
      const token = localStorage.getItem("authToken");

      // kalau belum login skip
      if (!token) return;

      const response = await API.get("/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isSaved = response.data.data.some((item) => item.id_film == id);

      setSaved(isSaved);
    } catch (error) {
      console.log(error);
    }
  }

  async function recordHistory() {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      await API.post(
        "/api/history",
        { id_film: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Failed to record history:", error);
    }
  }

  async function toggleWatchlist() {
    const token = localStorage.getItem("authToken");

    // Jika belum login
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (!saved) {
        await API.post(
          "/api/watchlist",
          {
            id_film: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setSaved(true);
      } else {
        const response = await API.get("/api/watchlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const movieSaved = response.data.data.find(
          (item) => item.id_film == id,
        );

        if (movieSaved) {
          await API.delete(`/api/watchlist/${movieSaved.id_watchlist}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        setSaved(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Fungsi helper untuk mendeteksi tipe URL gambar (eksternal vs lokal)
  const getImageUrl = (url) => {
    if (!url)
      return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `http://localhost:3000/uploads/${url}`;
  };

  // Fungsi helper untuk mengubah link YouTube biasa menjadi link Embed yang bisa diputar di iframe
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtu.be/")) {
      const parts = url.split("youtu.be/");
      const id = parts[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("v=")) {
      const parts = url.split("v=");
      const id = parts[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("embed/")) {
      return url;
    }
    return null;
  };

  if (!movie) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h1>Memuat Detail Film...</h1>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(movie.video_url);

  return (
    <>
      <Navbar />

      <div className="detail-container">
        {/* Poster Blur Efek Latar Belakang Sinematik */}
        <div className="detail-backdrop">
          <img
            src={getImageUrl(movie.foto_url)}
            alt=""
            className="detail-backdrop-img"
            referrerPolicy="no-referrer"
          />
          <div className="detail-backdrop-overlay"></div>
        </div>

        {/* 🍿 MODE BIOSKOP (THEATER MODE): Layar Lebar Megah di Atas Halaman Detail */}
        {embedUrl && (
          <div className="cinema-theater">
            <span className="theater-badge">🍿 MODE BIOSKOP AKTIF</span>
            <div className="cinema-screen">
              <iframe
                src={`${embedUrl}?autoplay=1&rel=0`}
                title={`Trailer ${movie.judul}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="detail-content">
          <div className="detail-left">
            <img
              src={getImageUrl(movie.foto_url)}
              alt={movie.judul}
              className="detail-poster"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="detail-right">
            <span className="movie-badge">Streaming Now</span>
            <h1 className="movie-title">{movie.judul}</h1>

            <p className="movie-description">{movie.deskripsi}</p>

            {/* Jika format video_url bukan YouTube, sajikan tombol putar eksternal */}
            {!embedUrl && movie.video_url && (
              <div className="video-fallback">
                <a
                  href={movie.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-btn"
                >
                  ▶️ Tonton Film Sekarang
                </a>
              </div>
            )}

            <div className="action-buttons">
              <button
                className={`bookmark-btn ${saved ? "saved" : ""}`}
                onClick={toggleWatchlist}
              >
                {saved ? "✓ Batal Simpan" : "+ Simpan"}
              </button>

              <Link to="/" className="back-btn">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <div className="login-modal-icon">🔒</div>

            <h2 className="login-modal-title">Login Diperlukan</h2>

            <p className="login-modal-text">
              Kamu harus login terlebih dahulu untuk menyimpan film ke
              watchlist.
            </p>

            <div className="login-modal-actions">
              <button
                className="modal-cancel-btn"
                onClick={() => setShowLoginModal(false)}
              >
                Nanti Saja
              </button>

              <button
                className="modal-login-btn"
                onClick={() => navigate("/login")}
              >
                Login Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default DetailFilm;
