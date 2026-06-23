{/*import React, { useEffect, useState, use } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../services/authService"
import MovieSection from "../components/MovieSection";

const safeFetchMovies = (url: string) => 
  fetch(url)
    .then(res => {
      if (!res.ok) return { results: [] };
      return res.json();
    })
    .catch(() => ({ results: [] }));

const popularPreviewPromise = safeFetchMovies("http://localhost:8000/api/movies/list?type=popular");

function LandingPage() {
  const navigate = useNavigate();
  const popularData = use(popularPreviewPromise);
  const sampleMovies = popularData?.results?.slice(0, 10) || [];

  useEffect(() => {
    const checkLoggedUser = async () => {
      try {
        const activeUser = await user();
        if (activeUser) {
          navigate("/home");
        }
      } catch (error) {
        console.log("Guest user, staying on landing page.");
      }
    };
    checkLoggedUser();
  }, [navigate]);


  return (
    <div className="min-h-screen bg-movie-bg text-movie-text-main font-body">
      <main className="w-full px-16 py-14">
        
        <div className="bg-movie-surface rounded-xl border border-gray-800 p-8 shadow-md text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold font-display mb-2">
            Welcome to <span className="text-movie-accent">MovieBook</span>
          </h2>
          <p className="text-movie-text-sec text-lg mb-6">
            Your personal cinema diary. Track films, write reviews, and build your ultimate watchlist.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-movie-accent text-movie-text-main font-bold rounded-lg hover:bg-[#1b97b2] transition-colors cursor-pointer"
            >
              Get Started For Free
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-movie-surface transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

        
        <div className="flex justify-between items-center mb-2 max-w-7xl mx-auto">
          <MovieSection title="Trending Movies" movies={sampleMovies} isLoggedIn={false} />
          <button className="text-sm text-movie-accent hover:text-[#1b97b2] font-semibold transition-colors cursor-pointer flex items-center gap-1">
            See all movies →
          </button>
        </div>

      </main>
    </div>
  );
}

export default LandingPage;

*/}