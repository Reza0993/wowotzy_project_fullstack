import MovieCard from "../Moviecard/Moviecard";
import "./MovieRow.css";

function MovieRow({ title, movies }) {
  return (
    <section className="movie-row">

      <h2>{title}</h2>

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