import React from "react";
import { useNavigate } from "react-router-dom";
import {
  keepWatchingMovies,
  trendingMovies,
  topRatedMovies,
} from "../data/movies";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";

function HomePage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-movie-bg text-movie-text-main font-body">
      <nav className="w-full bg-movie-surface border-b border-gray-800 px-6 py-4 flex justify-between items-center shadow-lg">
        <h1
          className="text-5xl font-black font-display text-movie-accent tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          MovieBook
        </h1>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm bg-movie-bg hover:bg-movie-surface border border-gray-700 rounded-md transition-colors cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 text-sm bg-movie-bg hover:bg-movie-surface border border-gray-700 rounded-md transition-colors cursor-pointer"
          >
            My Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-[#eb5959] hover:bg-[#d44b4b] text-white rounded-md transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="w-full px-16 py-14">
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full max-w-3xl h-14 px-5 bg-movie-surface text-white border-2 border-movie-accent rounded-xl text-center outline-none"
          />
        </div>
        <HeroBanner />

        <MovieSection title="Keep Watching" movies={keepWatchingMovies} />

        <MovieSection title="Trending Movies" movies={trendingMovies} />

        <MovieSection title="Top Rated" movies={topRatedMovies} />
      </main>
    </div>
  );
}

export default HomePage;
