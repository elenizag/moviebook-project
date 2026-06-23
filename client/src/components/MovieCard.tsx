import { useNavigate } from "react-router-dom";

type MovieCardProps = {
  id: number;
  title: string;
  rating: string;
  genre: string;
  isLoggedIn: boolean;
  poster_path?: string;
};

function MovieCard({ id, title, rating, genre, isLoggedIn, poster_path }: MovieCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/${id}`);
  };

  const movieImageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w342${poster_path}`
    : "https://placehold.co/342x513/1a1a1a/ffffff?text=No+Image";


  return (
    <div
      onClick={handleCardClick} 
      className="movie-card">
      <div className="w-full aspect-[2/3] bg-gray-900 overflow-hidden">
        <img 
          src={movieImageUrl} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="movie-info p-2 bg-movie-surface">
        <h3 className="font-bold text-base truncate">{title}</h3>
        <p className="movie-meta">2024 • {genre}</p>
        <p className="movie-rating">⭐ {rating}</p>
      </div>
    </div>
  );
}

export default MovieCard;