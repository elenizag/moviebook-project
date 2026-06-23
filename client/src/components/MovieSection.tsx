import MovieCard from "./MovieCard";

type MovieSectionProps = {
  title: string;
  isLoggedIn: boolean;
  movies: {
    id: number;
    title: string;
    rating: number;
    genre: string;
    poster_path: string | undefined;
  }[];
};

function MovieSection({
  title,
  movies,
  isLoggedIn
}: MovieSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-5">
        {title}
      </h2>

      <div className="flex gap-5 flex-wrap">
        {movies.map((movie) => (
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
    </section>
  );
}

export default MovieSection;