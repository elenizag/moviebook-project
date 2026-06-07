import React, { useState } from "react";
import ProfPic from "../../Assets/ProfPic.png";
import MoviePoster from "../../Assets/MoviePoster3.jpg";
import { Review } from "../../pages/FeedPage";

interface PostCardProps {
  review: Review;
}

export default function PostCard({ review }: PostCardProps) {
  const [like, setLike] = useState<number>(0);

  return (
    <section className="flex flex-col gap-4 bg-movie-surface/40 p-5 rounded-xl border border-movie-border/60 max-w-2xl w-full">
      {/* TOP ROW */}
      <div className="flex justify-between items-center w-full bg-movie-bg/60 p-3 rounded-xl">
        <div className="flex items-center gap-3 ">
          <img
            src={ProfPic}
            alt="Profile pic"
            className="w-10 h-10 border border-movie-accent/40 rounded-full object-cover shrink-0 cursor-pointer active:border-movie-accent"
          />
          <h2 className="text-sm md:text-base font-medium text-movie-text-sec">
            <span className="text-white font-semibold hover:text-movie-accent cursor-pointer transition-colors duration-200 active:text-movie-accent/60">
              {review.username}
            </span>{" "}
            reviewed{" "}
            <span className="text-movie-accent font-bold italic hover:underline cursor-pointer active:text-movie-accent/60">
              {review.movieTitle}
            </span>
          </h2>
        </div>
        <span className="text-xs text-movie-text-sec shrink-0">
          {review.timeAgo}
        </span>
      </div>

      {/* MIDDLE ROW */}
      <div className="flex gap-4 items-start w-full">
        <img
          src={MoviePoster}
          alt="Movie poster"
          className="w-24 h-36 object-cover rounded-md shadow-md shrink-0 border border-movie-border"
        />

        <div className="flex flex-col gap-2 grow min-w-0">
          <div className="flex items-center gap-1 text-sm font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded w-fit">
            <span>{"⭐".repeat(review.rating)}</span>
            <span className="text-xs ml-1 text-white">{review.rating}/5</span>
          </div>

          <p className="text-sm md:text-base text-movie-text-sec italic leading-relaxed line-clamp-4">
            "{review.reviewText}"
          </p>

          <button className="hover:underline cursor-pointer text-movie-accent text-xs font-medium w-fit mt-1">
            Read More
          </button>
        </div>
      </div>

      <hr className="border-movie-border/40 w-full mt-2" />
      {like > 0 ? (
        <span className="text-xs font-semibold text-movie-text-main/80">
          {like} people liked your post!
        </span>
      ) : (
        <div className="my-2"></div>
      )}
      {/* BOTTOM ROW */}
      <div className="flex items-center gap-4 text-sm text-movie-text-sec w-full">
        {!like ? (
          <button
            onClick={() => {
              setLike(like + 1);
            }}
            className="flex w-20 h-9 justify-center items-center gap-1.5 hover:text-movie-accent bg-movie-accent/10 hover:bg-movie-accent/20 text-movie-accent px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 font-medium"
          >
            👍 Like
          </button>
        ) : (
          <button
            onClick={() => {
              setLike(like - 1);
            }}
            className="flex w-20 h-9 justify-center items-center gap-1.5 hover:text-movie-accent bg-movie-accent/10 hover:bg-movie-accent/20 text-movie-accent px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 font-bold  shadow-xs shadow-movie-accent"
          >
            Liked
          </button>
        )}
        <button className="flex  w-24 h-9 px-1 py-1 items-center gap-1.5 hover:text-white bg-movie-border/40 hover:bg-movie-accent/20  rounded-lg cursor-pointer transition-all duration-300 font-medium">
          💬 Comment
        </button>
      </div>
    </section>
  );
}
