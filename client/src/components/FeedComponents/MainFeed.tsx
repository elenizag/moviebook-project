import React from "react";
import PostCard from "./PostCard";
import { Review } from "../../pages/FeedPage";

interface MainFeedProps {
  reviews: Review[];
}

export default function MainFeed({ reviews }: MainFeedProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {reviews.length === 0 ? (
        <p className="text-sm text-movie-text-sec/60 italic text-center py-8">
          No reviews yet. Be the first to share your thoughts!
        </p>
      ) : (
        reviews.map((review) => <PostCard key={review.id} review={review} />)
      )}
    </div>
  );
}
