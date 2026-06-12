import React, { useState } from "react";
import ProfPic from "../../Assets/ProfPic.png";
import movieImage from "../../Assets/MoviePoster1.jpg";
interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmit: (review: {
    movieTitle: string;
    rating: number;
    reviewText: string;
  }) => void;
}

const MOCK_MOVIES = [
  "The Dark Knight",
  "Inception",
  "Interstellar",
  "The Batman",
  "Pulp Fiction",
  "Fight Club",
];

export default function ReviewDialog({
  isOpen,
  onClose,
  onReviewSubmit,
}: ReviewDialogProps) {
  const [movieSearch, setMovieSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (!isOpen) return null;

  const filteredMovies = MOCK_MOVIES.filter((movie) =>
    movie.toLowerCase().includes(movieSearch.toLowerCase()),
  );

  const handleSelectMovie = (movie: string) => {
    setSelectedMovie(movie);
    setMovieSearch(movie);
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReviewSubmit({
      movieTitle: selectedMovie,
      rating: rating,
      reviewText: reviewText,
    });
    setMovieSearch("");
    setSelectedMovie("");
    setRating(0);
    setReviewText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ease-in-out"
        onClick={onClose}
      />
      <div className="bg-movie-dark border border-movie-border/80 w-full max-w-lg rounded-xl shadow-2xl relative z-10 p-6 duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-movie-accent focus:ring-offset-2 disabled:pointer-events-none text-movie-text-sec cursor-pointer text-sm p-1"
        >
          ✕<span className="sr-only">Close</span>
        </button>

        {/* DIALOG HEADER */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
          <h2 className="text-lg font-semibold text-white leading-none tracking-tight">
            Create New Review
          </h2>
          <p className="text-sm text-movie-text-sec/60">
            Share your cinema experience with the community. Select a movie and
            leave your rating.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-3 items-start w-full relative">
            <img
              src={ProfPic}
              alt="User profile"
              className="w-9 h-9 border border-movie-accent/30 rounded-full object-cover shrink-0 mt-0.5"
            />

            <div className="flex-1 flex flex-col relative">
              <input
                type="text"
                placeholder="Search and select a movie..."
                value={movieSearch}
                onChange={(e) => {
                  setMovieSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="w-full bg-movie-surface/40 border border-movie-border/80 rounded-md px-3 py-2 text-sm text-white placeholder-movie-text-sec/40 focus:outline-none focus:ring-2 focus:ring-movie-accent/50 focus:border-movie-accent transition-all"
              />
              {/*εδω θα χρειαστει GET request*/}
              {showDropdown && movieSearch && filteredMovies.length > 0 && (
                <ul className="absolute left-0 right-0 top-11 bg-movie-bg border border-movie-border/80 rounded-md shadow-xl z-50 max-h-40 overflow-y-auto p-1">
                  {filteredMovies.map((movie, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectMovie(movie)}
                      className="px-3 py-2 text-sm  hover:bg-movie-surface hover:text-white rounded-sm cursor-pointer transition-colors"
                    >
                      <div className="flex gap-4">
                        <img
                          src={movieImage}
                          alt={movie}
                          className="w-18 h-18 object-fit"
                        />
                        <div className="flex flex-col gap-0.5">
                          <h2 className="text-movie-text text-md">{movie}</h2>{" "}
                          <span className="text-movie-text-sec text-sm">
                            1992
                          </span>
                          <span className="text-movie-text-sec text-sm">
                            Thriller, Action
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 px-1 mt-1">
            <span className="text-xs font-medium text-movie-text-sec/80 tracking-wide">
              Rating
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-lg cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                >
                  <span
                    className={
                      star <= (hoverRating || rating)
                        ? "text-amber-400"
                        : "text-movie-text-sec/20"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="text-xs font-semibold text-white bg-amber-400/10 px-2 py-0.5 rounded-md">
                {rating} / 5
              </span>
            )}
          </div>

          <div className="w-full mt-1">
            <textarea
              placeholder="What did you think of the movie? Share your thoughts..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              className="w-full bg-movie-surface/40 border border-movie-border/80 rounded-md p-3 text-sm text-white placeholder-movie-text-sec/40 focus:outline-none focus:ring-2 focus:ring-movie-accent/50 focus:border-movie-accent resize-none transition-all leading-relaxed"
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 w-full pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-md border border-movie-border/80 bg-transparent px-4 py-2 text-sm font-medium text-movie-text-sec hover:bg-movie-surface hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            {/*εδω θα χρειαστει Post request*/}
            <button
              type="submit"
              disabled={!selectedMovie || rating === 0 || !reviewText.trim()}
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-md bg-movie-accent text-white font-semibold text-sm px-4 py-2 hover:bg-opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm active:scale-98"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
