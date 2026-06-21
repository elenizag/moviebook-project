import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

function TrendingPage() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/list?type=popular")
      .then(res => res.json())
      .then(data => {
        const movies = data.results?.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          genre: movie.genre_ids?.[0] || "",
          poster_path: movie.poster_path,
        })) || [];
        setMovies(movies);
      });
  }, []);

  return (
    <div className="min-h-screen bg-movie-bg text-movie-text-main font-body">
      <main className="w-full px-16 py-14">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          Trending Movies
        </h1>
        <div className="flex gap-5 flex-wrap justify-start">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.rating ? movie.rating.toString() : "N/A"}
              genre={movie.genre}
              isLoggedIn={true}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default TrendingPage;