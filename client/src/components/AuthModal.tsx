import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaLock } from "react-icons/fa";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md animate-fadeIn">
      <div className="bg-movie-surface border border-gray-800 rounded-2xl p-8 max-w-md w-full relative shadow-2xl text-center flex flex-col items-center gap-5">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          <FaTimes />
        </button>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold font-display text-movie-text-main">
            Join the Community!
          </h3>
          <p className="text-movie-text-sec text-sm leading-relaxed">
            To view the community feed, write reviews, and manage your watchlist, you need to be part of the MovieBook club.
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 mt-2">
          <button
            onClick={() => { onClose(); navigate("/login"); }}
            className="w-full py-3 bg-movie-accent text-movie-text-main font-bold rounded-xl hover:bg-[#1b97b2] transition-all cursor-pointer shadow-md"
          >
            Sign In
          </button>
          <button
            onClick={() => { onClose(); navigate("/register"); }}
            className="w-full py-3 border border-gray-700 text-movie-text-main font-semibold rounded-xl hover:bg-movie-bg/50 transition-all cursor-pointer"
          >
            Create an Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default AuthModal;