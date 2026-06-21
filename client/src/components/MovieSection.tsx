import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

type MovieSectionProps = {
  title: string;
  isLoggedIn: boolean;
  type?: "trending" | "toprated";
  movies: {
    id: number;
    title: string;
    rating: number;
    genre: string;
    poster_path?: string;
  }[];
};

function MovieSection({
  title,
  movies,
  isLoggedIn,
  type
}: MovieSectionProps) {
  const navigate = useNavigate();

  const displayedMovies = movies.slice(0, 8);

  const handleMore = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (type === "trending") {
      navigate("/trending");
    } else if (type === "toprated") {
      navigate("/toprated");
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-5">
        {title}
      </h2>

      <div className="flex gap-5 flex-wrap">
        {displayedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating ? movie.rating.toString() : "N/A"}
            genre={movie.genre}
            isLoggedIn={isLoggedIn}
            poster_path={movie.poster_path}
          />
        ))}
      </div>

      {movies.length > 8 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleMore}
            className="text-movie-accent hover:underline text-sm font-semibold"
          >
            More...
          </button>
        </div>
      )}
    </section>
  );
}

export default MovieSection;