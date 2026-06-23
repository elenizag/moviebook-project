import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt} from "react-icons/fa";
import LogoutButton from "./LogoutButton";

interface FooterProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

function Footer({ isLoggedIn, onLogout }: FooterProps) {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false); 

  return (
    <footer className="bg-movie-surface border-t border-[#b4b4b4]/20 text-movie-text-main py-12 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-2xl font-bold font-display text-movie-accent">
            <FaFilm />
            <span>MovieBook</span>
          </div>
          <p className="text-movie-text-sec text-sm leading-relaxed max-w-[300px]">
            Your ultimate movie guide, personal cinema diary, and community platform for film lovers.
          </p>
          
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-movie-text-main font-display mb-1 border-b border-movie-accent/30 pb-1 w-fit">
            Navigation
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-movie-text-sec">
            <li>
              <Link to="/" className="hover:text-movie-accent transition-colors">Home & Explore</Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login" className="hover:text-movie-accent transition-colors">Sign In</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-movie-accent transition-colors">Create Account</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/feed" className="hover:text-movie-accent transition-colors">Feed</Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-movie-accent transition-colors">My Profile</Link>
                </li>
                <li>
                  <LogoutButton 
                    onLogoutSuccess={onLogout}
                    className="hover:text-red-400 transition-colors text-left cursor-pointer">
                  </LogoutButton>
                </li>
              </>
            )}

            <li className="border-t border-[#b4b4b4]/10 pt-2 mt-1">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-movie-accent transition-colors text-left cursor-pointer focus:outline-none"
              >
                About us
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsContactOpen(true)}
                className="hover:text-movie-accent transition-colors text-left cursor-pointer focus:outline-none"
              >
                Contact us
              </button>
            </li>


          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-movie-text-main font-display mb-1 border-b border-movie-accent/30 pb-1 w-fit">
            Credits
          </h3>
          <p className="text-xs text-movie-text-sec leading-relaxed">
            This product uses the TMDB API but is not endorsed or certified by TMDB. All movie data and images are provided by TheMovieDB.
          </p>
          <div className="mt-2 px-3 py-1.5 bg-movie-bg/50 rounded border border-[#b4b4b4]/10 w-fit text-[10px] font-bold tracking-wider text-movie-accent">
            POWERED BY TMDB
          </div>
        </div>

      </div>

      <div className="max-full mx-auto px-6 mt-10 pt-6 border-t border-[#b4b4b4]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-movie-text-sec">
        <p>© 2026 MovieBook. All rights reserved.</p>
      </div>

      {/* pop us modal - About us*/}
      {isAboutOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-movie-surface border border-gray-800 rounded-xl p-6 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>

            <h3 className="text-2xl font-bold font-display text-movie-accent mb-4">About Us</h3>
            <p>We are a team of passionate developers who created MovieBook as our educational project at SKG.EDU. Our goal is to provide film enthusiasts with a modern, interactive platform to discover movies, manage their watchlists, and share their reviews with the community.</p>
          </div>
        </div>
      )}



      {/* pop us modal - Contact us*/}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-movie-surface border border-gray-800 rounded-xl p-6 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <FaTimes />
            </button>
          
            <h3 className="text-2xl font-bold font-display text-movie-accent mb-4">Contact Us</h3>
            <div className="space-y-4 text-movie-text-main text-sm mt-2">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-movie-accent text-base shrink-0" />
                <span>info@moviebook.gr</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-movie-accent text-base shrink-0" />
                <span>+30 2310 000 000</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-movie-accent text-base shrink-0" />
                <span className="text-movie-text-sec">Thessaloniki, Greece</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}

export default Footer;