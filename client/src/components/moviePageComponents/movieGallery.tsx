import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
interface MovieGalleryProps {
  category: string;
  currentMovieId: string;
}
interface Movie {
  id: string;
  title: string;
  poster_path: string;
}

export default function MovieGallery({
  category,
  currentMovieId,
}: MovieGalleryProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // States για το drag-to-scroll
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    async function getMoviesByCategory(cat: string) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${cat}?page=1`,
        );
        const data = await response.json();
        setMovies(data.results || data);
      } catch (error) {
        console.error(error);
      }
    }

    getMoviesByCategory(category);
  }, [category]);

  // Λειτουργίες Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 relative group mb-10">
      <h2 className="text-3xl text-white font-bold mb-6 capitalize">
        Similar Movies
      </h2>

      <div className="relative flex items-center">
        <button
          onClick={() =>
            scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
          }
          className="absolute left-0 z-20 bg-black/60 p-2 rounded-full hover:bg-black/90 transition-all opacity-0 group-hover:opacity-100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 w-full overflow-x-hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDown(false)}
          onMouseUp={() => setIsDown(false)}
          onMouseMove={handleMouseMove}
        >
          {movies
            .filter((movieResult) => movieResult.id !== currentMovieId)
            .map((movie) => (
              <div key={movie.id} className="flex-none">
                <a href={`/movies/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    draggable="false"
                    className="rounded-xl w-40 h-60 object-cover shadow-lg cursor-pointer"
                  />
                </a>
              </div>
            ))}
        </div>

        <button
          onClick={() =>
            scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
          }
          className="absolute right-0 z-20 bg-black/60 p-2 rounded-full hover:bg-black/90 transition-all opacity-0 group-hover:opacity-100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
