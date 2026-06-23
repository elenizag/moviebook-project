import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import { user } from "../../services/authService";

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await user();
        setCurrentUser(data); 
      } catch (error) {
        setCurrentUser(null); 
      }
    };
    checkUser();
  }, [location.pathname]);

  const handleLogoutSuccess = () => {
    setCurrentUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-movie-bg">
      <Navbar 
        currentUser={currentUser} 
        isLoggedIn={!!currentUser} 
        onLogout={handleLogoutSuccess}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { searchQuery, currentUser } as any);
          }
          return child;
        })}
      </main>
      
      <Footer isLoggedIn={!!currentUser} onLogout={handleLogoutSuccess} />
    </div>
  );
}

export default MainLayout;