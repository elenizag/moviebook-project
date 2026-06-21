import React, { useState, useEffect, use } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import { user } from "../services/authService"

const safeFetchMovies = (url: string) => 
  fetch(url)
    .then(res => {
      if (!res.ok) return { results: [] }; 
      return res.json();
    })
    .catch(() => ({ results: [] })); 

const popularPromise = safeFetchMovies("http://localhost:8000/api/movies/list?type=popular");
const topRatedPromise = safeFetchMovies("http://localhost:8000/api/movies/list?type=top-rated");
const userPromise = user().catch(() => null);

function HomePage({searchQuery} : {searchQuery?: string}) {
  const currentUserData = use(userPromise);
  const popularData = use(popularPromise);
  const topRatedData = use(topRatedPromise);

  const currentUser = (currentUserData?.user || currentUserData) ?? null;
 const trending = popularData.results?.map((movie: any) => ({
  id: movie.id,
  title: movie.title,
  rating: movie.vote_average,
  genre: movie.genre_ids?.[0] || "",
  poster_path: movie.poster_path,
  release_date: movie.release_date
})) || [];

const topRated = topRatedData.results?.map((movie: any) => ({
  id: movie.id,
  title: movie.title,
  rating: movie.vote_average,
  genre: movie.genre_ids?.[0] || "",
  poster_path: movie.poster_path,
  release_date: movie.release_date
})) || [];

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const response = await fetch(`http://localhost:8000/api/movies/search?query=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const isSearching = searchQuery && searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-movie-bg text-movie-text-main font-body">
      <main className="w-full px-16 py-14">

      {isSearching ? (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-display">
            Search Results for: <span className="text-movie-accent">"{searchQuery}"</span>
          </h2>
          {searchLoading ? (
            <p className="text-movie-accent animate-pulse">Searching...</p>
          ) : (
            <MovieSection title="" movies={searchResults} isLoggedIn={true} />
          )}
        </div>
      ) : (
        <>
          <div className="bg-movie-surface rounded-xl border border-gray-800 p-8 shadow-md text-center mb-10 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold font-display mb-2">
              Welcome back,{" "}
              <span className="text-movie-accent">
                {currentUser.name || currentUser?.username || currentUser?.email}
              </span>
              !
            </h2>
            <p className="text-movie-text-sec text-lg m-0">
              Explore your favorite movies, manage your watchlist, and see what's
              trending today.
            </p>
          </div>

          <HeroBanner />

          <div className="space-y-10 mt-10">
            {/*<MovieSection title="Keep Watching" movies={keepWatching} isLoggedIn={true} /> */}
            <MovieSection title="Trending Movies" movies={trending} isLoggedIn={true} type="trending" />
            <MovieSection title="Top Rated" movies={topRated} isLoggedIn={true} />
          </div>
        </>
      )}
      </main>
    </div>
  );
}

export default HomePage;


