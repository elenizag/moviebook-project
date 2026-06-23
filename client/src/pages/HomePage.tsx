import React, { useState, useEffect, use } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import { user } from "../services/authService"

const safeFetchMovies = (url: string) => 
  fetch(url)
    .then(res => {
      if (!res.ok) return { results: [] }; 
      return res.json();
    })
    .catch(() => ({ Appresults: [] })); 

const popularPromise = safeFetchMovies("http://localhost:8000/api/movies/list?type=popular");
const topRatedPromise = safeFetchMovies("http://localhost:8000/api/movies/list?type=top-rated");

function HomePage({searchQuery} : {searchQuery?: string}) {
  const navigate = useNavigate();
  const location = useLocation();

  const popularData = use(popularPromise);
  const topRatedData = use(topRatedPromise);
  const trending = popularData.results || [];
  const topRated = topRatedData.results || [];
  const [currentTrendingPage, setCurrentTrendingPage] = useState(0);
  const moviesPerPage = 5; 

  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await user();
        const userData = data?.user || data;
        setLocalUser(userData ?? null);
      } catch (err) {
        setLocalUser(null);
      }
    }
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, [location.pathname]);

  const isLoggedIn = localUser !== null;

  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!urlSearchQuery || urlSearchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        setSearchLoading(true);
        const response = await fetch(`http://localhost:8000/api/movies/search?query=${urlSearchQuery}`);
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setSearchLoading(false);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [urlSearchQuery]);

  const isSearching = urlSearchQuery && urlSearchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-movie-bg text-movie-text-main font-body">
      <main className="w-full px-16 py-14">

      {isSearching ? (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-display">
            Search Results for: <span className="text-movie-accent">"{urlSearchQuery}"</span>
          </h2>
          {searchLoading ? (
            <p className="text-movie-accent animate-pulse">Searching...</p>
          ) : (
            <MovieSection title="" movies={searchResults} isLoggedIn={true} />
          )}
        </div>
      ) : (
        <>
          {isLoggedIn ? (
            <div className="bg-movie-surface rounded-xl border border-gray-800 p-8 shadow-md text-center mb-10 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold font-display mb-2">
                Welcome back,{" "}
                <span className="text-movie-accent">
                  {localUser.name || localUser?.username || localUser?.email}
                </span>
                !
              </h2>
              <p className="text-movie-text-sec text-lg m-0">
                Explore your favorite movies, manage your watchlist, and see what's
                trending today.
              </p>
            </div>
          ) : (
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
          )}

          { isLoggedIn && <HeroBanner /> }

          <div className="space-y-10 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
              
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                  <h2 className="text-2xl font-bold font-display text-movie-text-main">
                    Trending Movies
                  </h2>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      disabled={currentTrendingPage === 0}
                      onClick={() => setCurrentTrendingPage(prev => prev - 1)}
                      className={`text-sm font-semibold transition-colors focus:outline-none ${
                        currentTrendingPage === 0 
                          ? "text-gray-600" 
                          : "text-movie-accent hover:text-[#1b97b2] cursor-pointer"
                      }`}
                    >
                      ← Previous
                    </button>

                    <span className="text-xs text-gray-500 font-medium">
                      Page {currentTrendingPage + 1}
                    </span>

                    <button 
                      disabled={(currentTrendingPage + 1) * moviesPerPage >= trending.length}
                      onClick={() => setCurrentTrendingPage(prev => prev + 1)}
                      className={`text-sm font-semibold transition-colors focus:outline-none ${
                        (currentTrendingPage + 1) * moviesPerPage >= trending.length
                          ? "text-gray-600" 
                          : "text-movie-accent hover:text-[#1b97b2] cursor-pointer"
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                </div>
                
                <MovieSection 
                  title="" 
                  movies={trending.slice(
                    currentTrendingPage * moviesPerPage, 
                    (currentTrendingPage + 1) * moviesPerPage
                  )} 
                  isLoggedIn={isLoggedIn} 
                />
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-2">
                  <h2 className="text-2xl font-bold font-display text-movie-text-main">
                    Top Rated
                  </h2>
                </div>
                <MovieSection title="" movies={topRated} isLoggedIn={isLoggedIn} />
              </div>

            </div>
          </div>
        </>
      )}
      </main>
    </div>
  );
}

export default HomePage;
