import React, { useState, useEffect } from "react";
import ProfPic from "../../Assets/ProfPic.png";
import { Review } from "../../pages/FeedPage";
import MoviePoster from "../../Assets/MoviePoster1.jpg";

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  timeAgo: string;
  replies?: Comment[];
  likes: boolean;
}

export default function CommentDialog({
  isOpen,
  onClose,
  review,
}: CommentDialogProps) {
  const [commentText, setCommentText] = useState<string>("");
  const [replyText, setReplyText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [activeShowReplyId, setActiveShowReplyId] = useState<string | null>(
    null,
  );
  // Φόρτωση σχολίων από το localStorage
  useEffect(() => {
    if (isOpen && review?.id) {
      const saved = localStorage.getItem(`comments_review_${review.id}`);
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        setComments([
          {
            id: "c1",
            username: "Dark_Knight",
            text: "Excellent movie! Tottaly would recommend.",
            timeAgo: "2h ago",
            likes: false,
          },
        ]);
      }
    }
  }, [isOpen, review?.id]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      username: "Not_Batman",
      text: commentText.trim(),
      timeAgo: "Just now",
      likes: false,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(
      `comments_review_${review.id}`,
      JSON.stringify(updatedComments),
    );
    setCommentText("");
  };
  const handleReply = (parentId: string, replyText: string) => {
    const newReply: Comment = {
      id: Date.now().toString(),
      username: "Not_Batman", //
      text: replyText.trim(),
      timeAgo: "Just now",
      replies: [],
      likes: false,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem(
      `comments_review_${review.id}`,
      JSON.stringify(updatedComments),
    );

    setReplyText("");
  };
  const handleLike = (id: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, likes: !comment.likes };
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem(
      `comments_review_${review.id}`,
      JSON.stringify(updatedComments),
    );
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ease-in-out"
        onClick={onClose}
      />

      {/* DIALOG CONTAINER */}
      <div className="bg-movie-dark border border-movie-border/80 w-full max-w-xl rounded-xl shadow-2xl relative z-10 p-6 duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 flex flex-col max-h-[90vh]">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-movie-accent text-movie-text-sec cursor-pointer text-sm p-1 z-20"
        >
          ✕<span className="sr-only">Close</span>
        </button>

        {/* DIALOG HEADER */}
        <div className="flex flex-col space-y-1.5 text-left mb-4 shrink-0">
          <h2 className="text-base font-semibold text-white leading-none tracking-tight">
            <span className="text-movie-accent font-black text-xl uppercase tracking-wide">
              {review.movieTitle}
            </span>{" "}
            - Comments
          </h2>
          <p className="text-xs text-movie-text-sec/60">
            Review discussion thread. Read what others think or leave your own
            comment.
          </p>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 custom-scrollbar">
          {/* THE ORIGINAL REVIEW (REUSABLE FUNCTION) */}
          <ReviewSection review={review} />

          <hr className="border-movie-border/40 w-full" />

          {/* COMMENTS LIST */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-movie-surface/30 border border-movie-border/50 rounded-lg p-3.5 flex flex-col gap-1.5"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm font-bold text-movie-accent hover:underline cursor-pointer">
                    @{comment.username}
                  </span>
                  <span className="text-xs text-movie-text-sec/50">
                    {comment.timeAgo}
                  </span>
                </div>
                <p className="text-sm text-movie-text-sec/90 leading-relaxed">
                  {comment.text}
                </p>
                {comment.replies && comment.replies.length > 0 ? (
                  activeShowReplyId === comment.id ? (
                    comment.replies.map((reply) => (
                      <div
                        className="flex flex-col mt-3 bg-movie-surface rounded-lg p-2 mx-4 my-1"
                        key={reply.id}
                      >
                        <div className="flex justify-between">
                          <h1 className="text-movie-accent font-semibold">
                            {reply.username}
                          </h1>
                          <h3 className="text-xs text-movie-text-sec">
                            {reply.timeAgo}
                          </h3>
                        </div>
                        <p className="px-1 mt-1 text-movie-text-main">
                          {reply.text}
                        </p>
                      </div>
                    ))
                  ) : (
                    <button
                      onClick={() => setActiveShowReplyId(comment.id)}
                      className="text-movie-accent text-sm m-2 text-start cursor-pointer hover:underline"
                    >
                      Show replies ({comment.replies.length})
                    </button>
                  )
                ) : null}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex w-19 h-8 justify-center items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 font-medium 
    ${
      comment.likes
        ? "bg-movie-accent/20 text-movie-accent font-bold shadow-xs shadow-movie-accent"
        : "bg-movie-accent/10 text-movie-accent hover:bg-movie-accent/20"
    }`}
                  >
                    {comment.likes ? "Liked" : "👍 Like"}
                  </button>

                  <button
                    onClick={() => {
                      setActiveReplyId(comment.id);
                    }}
                    className="flex w-19 h-8 justify-center items-center gap-1.5 hover:text-movie-accent bg-movie-accent/10 hover:bg-movie-accent/20 text-movie-accent px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 font-medium"
                  >
                    Reply
                  </button>
                </div>
                {activeReplyId === comment.id && (
                  <form
                    className="flex  gap-3 mt-1 shrink-0"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleReply(comment.id, replyText);
                      setActiveReplyId(null);
                    }}
                  >
                    <textarea
                      placeholder="Reply to @Dark_knight"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={1}
                      className="w-full bg-movie-surface/40 border border-movie-border/80 rounded-md px-2 py-1 text-sm text-white placeholder-movie-text-sec/40 focus:outline-none focus:ring-2 focus:ring-movie-accent/50 focus:border-movie-accent resize-none transition-all leading-relaxed"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="w-full sm:w-auto inline-flex justify-center items-center rounded-md bg-movie-accent text-white font-semibold text-sm px-5 py-2 hover:bg-opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm active:scale-98"
                    >
                      Post
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* INPUT/FORM AREA */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 pt-4 border-t border-movie-border/40 mt-4 shrink-0"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-movie-text-sec/80 px-0.5">
            Add your comment
          </span>

          <div className="flex gap-3 items-start w-full">
            <img
              src={ProfPic}
              alt="User profile"
              className="w-9 h-9 border border-movie-accent/30 rounded-full object-cover shrink-0 mt-1"
            />
            <div className="flex-1">
              <textarea
                placeholder="Write your thoughts about this review..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full bg-movie-surface/40 border border-movie-border/80 rounded-md p-3 text-sm text-white placeholder-movie-text-sec/40 focus:outline-none focus:ring-2 focus:ring-movie-accent/50 focus:border-movie-accent resize-none transition-all leading-relaxed"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 w-full mt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-md border border-movie-border/80 bg-transparent px-4 py-2 text-sm font-medium text-movie-text-sec hover:bg-movie-surface hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="w-full sm:w-auto inline-flex justify-center items-center rounded-md bg-movie-accent text-white font-semibold text-sm px-5 py-2 hover:bg-opacity-90 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-sm active:scale-98"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ReviewSectionProps {
  review: Review;
}

function ReviewSection({ review }: ReviewSectionProps) {
  return (
    <div className="flex gap-4 items-start w-full bg-movie-surface/20 border border-movie-border/40 p-4 rounded-xl">
      <img
        src={MoviePoster}
        alt="Movie poster"
        className="w-20 h-28 object-cover rounded-md shadow-md shrink-0 border border-movie-border"
      />

      <div className="flex flex-col gap-2 grow min-w-0">
        <div className="flex justify-between items-start w-full">
          <span className="text-sm font-semibold text-movie-text-sec">
            <span className="text-white font-bold">@{review.username}</span>{" "}
            reviewed this
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
            <span>★</span>
            <span className="text-white">{review.rating}/5</span>
          </div>
        </div>

        <p className="text-sm text-movie-text-sec/80 italic leading-relaxed line-clamp-3">
          "{review.reviewText}"
        </p>

        <button
          type="button"
          className="hover:underline cursor-pointer text-movie-accent text-xs font-medium w-fit mt-0.5"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
