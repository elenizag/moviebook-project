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
  const randomBackdrops = trending
  .filter((movie: any) => movie.backdrop_path)
  .sort(() => Math.random() - 0.5)
  .slice(0, 3);
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
    <div className="min-h-screen text-movie-text-main font-body relative">    
    {/* Glowing orbs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none z-0" style={{background: 'radial-gradient(circle, rgba(20,178,214,0.3) 0%, transparent 70%)'}} />
      <div className="absolute bottom-[40%] left-[-300px] w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{background: 'radial-gradient(circle, rgba(100,50,214,0.4) 0%, transparent 70%)'}} />
      <div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full pointer-events-none z-0" style={{background: 'radial-gradient(circle, rgba(20,178,214,0.25) 0%, transparent 70%)'}} />
      <div className="absolute top-[40%] right-[-300px] w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{background: 'radial-gradient(circle, rgba(100,50,214,0.4) 0%, transparent 70%)'}} />
      <main className="w-full px-16 py-14 relative z-10">

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

          <HeroBanner backdrops={randomBackdrops} />

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