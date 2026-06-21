import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieGallery from "../components/moviePageComponents/movieGallery";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any | null>(null);
  const [castData, setCastData] = useState<CastMember[]>([]);
  const [crewData, setCrewData] = useState<CrewMember | null>();
  useEffect(() => {
    async function getMovie(movieId: string | undefined) {
      if (!movieId) return;
      try {
        const response = await fetch(
          "http://localhost:8000/api/movies/" + movieId,
        );
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed:", error);
      }
    }

    async function getCredits() {
      if (!id) return;
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/${id}/credits`,
        );
        const data = await response.json();
        setCastData(data.cast?.slice(0, 12) || []);
        setCrewData(data.crew?.[0] || null);
      } catch (error) {
        console.error(error);
      }
    }
    getCredits();
    getMovie(id);
  }, [id]);

  if (!movie) {
    return <div className="p-8 text-white">Loading Movie...</div>;
  }
  console.log("movie json: ", movie);
  console.log("cast json", castData);
  console.log("crew json", crewData);
  return (
    <div className="flex flex-col">
      <section
        className="flex flex-col px-20 md:flex-row gap-8 p-8 bg-movie-surface/60 text-white rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className="w-64 h-96 object-cover rounded-lg shadow-xl"
        />
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-4xl font-bold">
            {movie.original_title}
            <span className="text-2xl text-gray-400 font-normal ml-2">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>

          <div className="flex items-center gap-3 text-sm">
            <span>
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <span className="font-bold text-yellow-500">
              {movie.vote_average.toFixed(1)} ⭐
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl my-10 mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
            Summary
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {movie.overview}
          </p>
          <div>
            <h2 className="text-2xl mt-5 font-bold border-b border-gray-700 pb-2">
              Cast & Crew
            </h2>

            <h3 className="text-xl mt-2 font-bold text-movie-accent">
              Top Cast:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {castData.map((cast) => (
                <div
                  key={cast.id}
                  className="flex justify-start items-center gap-4 my-3"
                >
                  <img
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                        : "https://placehold.co/185x278/1a1a1a/ffffff?text=No+Image"
                    }
                    alt={cast.name}
                    className="w-20 h-22 rounded-3xl object-cover shadow-md"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-base">
                      {cast.name}
                    </span>
                    <span className="text-neutral-400 text-sm">
                      {cast.character}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Information
            </h2>
            <div className="flex flex-col gap-3">
              <h3>
                <span className="text-gray-400 font-semibold">Status: </span>
                {movie.status}
              </h3>
              <h3>
                <span className="text-gray-400 font-semibold">Budget: </span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(movie.budget)}
              </h3>
              <h3>
                <span className="text-gray-400 font-semibold">Revenue: </span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(movie.revenue)}
              </h3>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Production
            </h2>
            <p className="text-gray-300 text-sm">
              {movie.production_companies.map((c) => c.name).join(", ")}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Director
            </h2>
            <div
              key={crewData?.id}
              className="flex justify-start items-center gap-4 my-3"
            >
              <img
                src={
                  crewData?.profile_path
                    ? `https://image.tmdb.org/t/p/w185${crewData.profile_path}`
                    : "https://placehold.co/185x278/1a1a1a/ffffff?text=No+Image"
                }
                alt={crewData?.name}
                className="w-16 h-18 rounded-3xl object-cover shadow-md"
              />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-base">
                  {crewData?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MovieGallery category="popular" currentMovieId={id as string} />
    </div>
  );
}
