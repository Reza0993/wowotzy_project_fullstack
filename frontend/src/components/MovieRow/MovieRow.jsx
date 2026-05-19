import { Link } from "react-router-dom";
import MovieCard from "../Moviecard/Moviecard";
import "./MovieRow.css";

function MovieRow({ title, movies }) {
  return (
    <section className="movie-row">
      <div className="row-header">
        <h2>{title}</h2>
        <Link to={`/see-all?category=${encodeURIComponent(title)}`} className="see-all-btn">
          Lihat Semua →
        </Link>
      </div>

      <div className="movie-list hide-scrollbar">

        {movies.map((movie) => (
          <MovieCard
            key={movie.id_film}
            movie={movie}
          />
        ))}

      </div>

    </section>
  );
}

export default MovieRow;