import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../../services/api";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./DetailFilm.css";

function DetailFilm() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getDetailMovie();
  }, []);

  async function getDetailMovie() {
    try {
      const response = await API.get(`/api/film/${id}`);
      setMovie(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fungsi helper untuk mendeteksi tipe URL gambar (eksternal vs lokal)
  const getImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300";
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
                <a href={movie.video_url} target="_blank" rel="noopener noreferrer" className="watch-btn">
                  ▶️ Tonton Film Sekarang
                </a>
              </div>
            )}

            <div className="action-buttons">
              <Link to="/" className="back-btn">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DetailFilm;