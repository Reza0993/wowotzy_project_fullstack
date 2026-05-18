import { Link } from "react-router-dom";
import "./Hero.css";

const DEFAULT_MOVIE = {
  id_film: 10,
  judul: "Interstellar",
  deskripsi: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
  video_url: "https://youtu.be/zSWdZVtXT7E",
  foto_url: "https://image.tmdb.org/t/p/original/gEU2QpI6EIt7t8S3d8n9nE8Yj4q.jpg"
};

function Hero({ movie }) {
  const activeMovie = movie || DEFAULT_MOVIE;

  // Fungsi helper untuk mengambil ID video YouTube
  const getYoutubeId = (url) => {
    if (!url) return null;
    if (url.includes("youtu.be/")) {
      const parts = url.split("youtu.be/");
      return parts[1].split("?")[0];
    }
    if (url.includes("v=")) {
      const parts = url.split("v=");
      return parts[1].split("&")[0];
    }
    if (url.includes("embed/")) {
      const parts = url.split("embed/");
      return parts[1].split("?")[0];
    }
    return null;
  };

  const videoId = getYoutubeId(activeMovie.video_url);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1`
    : null;

  return (
    <section className="hero">
      {/* Latar Belakang Video YouTube Sinematik yang AutoPlay & Loop (Netflix-Style) */}
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={activeMovie.judul}
          className="hero-iframe"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        /* Cadangan Gambar Latar Belakang HD jika URL video tidak ada */
        <img
          src={activeMovie.foto_url}
          alt={activeMovie.judul}
          className="hero-backdrop-img"
          referrerPolicy="no-referrer"
        />
      )}

      {/* Gambar Cadangan dengan z-index rendah agar tidak berkedip saat memuat video */}
      {embedUrl && activeMovie.foto_url && (
        <img
          src={activeMovie.foto_url}
          alt=""
          className="hero-backdrop-img"
          style={{ zIndex: -1 }}
          referrerPolicy="no-referrer"
        />
      )}

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <span className="trending">Trending Now</span>

        <h1>{activeMovie.judul}</h1>

        <p>{activeMovie.deskripsi}</p>

        <div className="hero-buttons">
          <Link to={`/film/${activeMovie.id_film}`} style={{ textDecoration: "none" }}>
            <button className="play-btn">▶ Play</button>
          </Link>

          <Link to={`/film/${activeMovie.id_film}`} style={{ textDecoration: "none" }}>
            <button className="info-btn">ℹ More Info</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;