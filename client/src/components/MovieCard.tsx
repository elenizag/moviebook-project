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
    if (!isLoggedIn) {
      alert("You must be logged in to view movie details!");
      navigate("/login");
    } else {
      navigate(`/movies/${id}`);
    }
  }

  return (
    <div onClick={handleCardClick} className="movie-card">
      <div className="movie-poster">
        {poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w300${poster_path}`} 
            alt={title}
            style={{width: "100%", height: "100%", objectFit: "cover"}}
          />
        ) : (
          "🎬"
        )}
      </div>

      <div className="movie-info">
        <h3>{title}</h3>
        <p className="movie-meta">2024 • {genre}</p>
        <p className="movie-rating">⭐ {rating}</p>
      </div>
    </div>
  );

}
export default MovieCard;