import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FeedPage from "./pages/FeedPage";
import MainLayout from "./components/Layouts/MainLayout";
import NavBarLayout from "./components/Layouts/NavBarLayout";
import LandingPage from "./pages/LandingPage";
import TrendingPage from "./pages/TrendingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <MainLayout>
              <Suspense fallback={<div className="min-h-screen bg-movie-bg flex items-center justify-center text-movie-accent animate-pulse">Loading Preview...</div>}>
                <LandingPage /> 
              </Suspense> 
            </MainLayout>} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <MainLayout> 
                <Suspense fallback={<div className="min-h-screen bg-movie-bg flex items-center justify-center text-movie-accent animate-pulse">Loading MovieBook Dashboard...</div>}>
                  <HomePage /> 
                </Suspense>
              </MainLayout>
            </ProtectedRoute>
          } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <NavBarLayout>
                <ProfilePage />
              </NavBarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute> 
              <MainLayout>
                <FeedPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
           <Route
          path="/trending"
          element={
            <ProtectedRoute>
              <MainLayout>
                <TrendingPage />
              </MainLayout>
            </ProtectedRoute>
          }
          />
        {/* Θα προσθέσετε τα υπόλοιπα routes εδώ */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
