import React from "react";
import ProfPic from "../../Assets/ProfPic.png";
import MoviePoster1 from "../../Assets/MoviePoster1.jpg";
import MoviePoster2 from "../../Assets/MoviePoster2.jpg";

export default function SideFeed() {
  return (
    <div className="hidden lg:flex flex-col gap-6 w-full max-w-xs">
      <div className="flex flex-col bg-movie-surface/40 p-5 rounded-xl border border-movie-border/60 gap-4 w-full">
        <h1 className="text-base font-bold text-white tracking-wide uppercase opacity-90">
          Suggested Followers
        </h1>

        <div className="flex items-center justify-between w-full bg-movie-surface/40 p-3 rounded-lg border border-movie-border/40 hover:border-movie-accent/30 transition-colors duration-200">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={ProfPic}
              alt="Profile pic"
              className="w-10 h-10 border border-movie-accent/40 rounded-full object-cover shrink-0 cursor-pointer active:border-movie-accent/60"
            />
            <h2 className="text-sm font-semibold text-movie-text-sec truncate hover:text-white cursor-pointer px-2">
              Not Batman
            </h2>
          </div>
          <button className="text-xs font-semibold bg-movie-accent/10 hover:bg-movie-accent/20 text-movie-accent border border-movie-accent/20 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 active:scale-95 shrink-0">
            Follow
          </button>
        </div>

        <div className="flex items-center justify-between w-full bg-movie-surface/40 p-3 rounded-lg border border-movie-border/40 hover:border-movie-accent/30 transition-colors duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={ProfPic}
              alt="Profile pic"
              className="w-10 h-10 border border-movie-accent/40 rounded-full object-cover shrink-0 cursor-pointer active:border-movie-accent/60"
            />
            <h2 className="text-sm font-semibold text-movie-text-sec truncate hover:text-white cursor-pointer px-2">
              Def Not Batman
            </h2>
          </div>
          <button className="text-xs font-semibold bg-movie-accent/10 hover:bg-movie-accent/20 text-movie-accent border border-movie-accent/20 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 active:scale-95 shrink-0">
            Follow
          </button>
        </div>
      </div>

      <div className="flex flex-col bg-movie-surface/40 p-5 rounded-xl border border-movie-border/60 gap-4 w-full">
        <h1 className="text-base font-bold text-white tracking-wide uppercase opacity-90">
          Trending Movies
        </h1>

        <div className="flex gap-4 items-center justify-start w-full">
          <img
            src={MoviePoster1}
            alt="Movie poster"
            className="w-20 h-28 object-cover rounded-md shadow-md shrink-0 border border-movie-border/80 hover:border-movie-accent hover:scale-102 transition-all duration-200 cursor-pointer"
          />
          <img
            src={MoviePoster2}
            alt="Movie poster"
            className="w-20 h-28 object-cover rounded-md shadow-md shrink-0 border border-movie-border/80 hover:border-movie-accent hover:scale-102 transition-all duration-200 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
