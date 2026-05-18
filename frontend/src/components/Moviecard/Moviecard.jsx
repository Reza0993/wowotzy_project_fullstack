import { Link } from "react-router-dom";
import "./Moviecard.css";

function MovieCard({ movie }) {
  // Fungsi helper untuk mendeteksi tipe URL gambar (eksternal vs lokal)
  const getImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `http://localhost:3000/uploads/${url}`;
  };

  return (
    <Link to={`/film/${movie.id_film}`}>

      <div className="movie-card">

        <img
          src={getImageUrl(movie.foto_url)}
          alt={movie.judul}
          referrerPolicy="no-referrer"
        />

        <div className="movie-overlay">
          <span>{movie.judul}</span>
        </div>

      </div>

    </Link>
  );
}

export default MovieCard;