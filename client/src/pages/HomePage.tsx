import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  keepWatchingMovies,
  trendingMovies,
  topRatedMovies,
} from "../data/movies";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import { user } from "../services/authService"

function HomePage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    // user is an async function returning the current user
    (async () => {
      try {
        const u = await user();
        if (mounted) setCurrentUser(u ?? null);
      } catch (e) {
        if (mounted) setCurrentUser(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // αν δεν είναι συνδεδεμένος
  if (!currentUser) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center text-center p-6 bg-movie-bg text-movie-text-main">
        <h2 className="text-5xl font-bold font-display mb-4">
          Welcome to <span className="text-movie-accent">MovieBook</span>
        </h2>
        <p className="text-movie-text-sec text-xl max-w-xl mx-auto mb-8">
          The ultimate platform for movie lovers. Discover trending films,
          create your personal watchlists, and share reviews with your friends.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-movie-accent text-movie-text-main font-bold rounded-lg hover:bg-[#1b97b2] transition-colors cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-movie-surface transition-colors cursor-pointer"
          >
            Create an Account
          </button>
        </div>
      </div>
    );
  }

  {
    /* αν είναι συνδεδεμένος */
  }
  return (
    <div className="min-h-screen bg-movie-bg text-movie-text-main font-body">
      <main className="w-full px-16 py-14">

        <div className="bg-movie-surface rounded-xl border border-gray-800 p-8 shadow-md text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold font-display mb-2">
            Welcome back,{" "}
            <span className="text-movie-accent">
              {currentUser.username || currentUser?.email}
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
          <MovieSection title="Keep Watching" movies={keepWatchingMovies} />
          <MovieSection title="Trending Movies" movies={trendingMovies} />
          <MovieSection title="Top Rated" movies={topRatedMovies} />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
