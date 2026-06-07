import React, { useState } from "react";
import ProfPic from "../../Assets/ProfPic.png";
import ReviewDialog from "./ReviewDialog";

interface PostFeedProps {
  onReviewSubmit: (review: {
    movieTitle: string;
    rating: number;
    reviewText: string;
  }) => void;
}
export default function PostFeed({ onReviewSubmit }: PostFeedProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-movie-surface/40 p-4 rounded-xl border border-movie-border/60 max-w-2xl w-full mt-5">
      <div className="flex gap-3 items-center w-ful">
        <img
          src={ProfPic}
          alt="Profile picture of the user"
          className="w-9 h-9 border border-movie-accent/40 rounded-full object-cover shrink-0 active:border-movie-accent cursor-pointer"
        />
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex-1 bg-movie-surface/60 border border-movie-border/80 rounded-lg px-4 py-2.5 text-sm text-movie-text-sec/50 cursor-pointer hover:border-movie-accent/60 hover:bg-movie-surface/80 transition-all duration-200"
        >
          Share your thoughts on a movie...
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-movie-accent/10 hover:bg-movie-accent/20 border border-movie-accent/30 text-movie-accent font-semibold text-xs px-4 py-2.5 rounded-lg cursor-pointer transition-all"
        >
          Review
        </button>
      </div>
      <ReviewDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmit={onReviewSubmit}
      />
    </div>
  );
}
