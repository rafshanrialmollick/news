import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { Home } from "./pages/Home";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetails } from "./pages/NewsDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CreateNews } from "./pages/CreateNews";
import { Dashboard } from "./pages/Dashboard";
import { ContactUs } from "./pages/ContactUs";

export function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-news"
              element={
                <ProtectedRoute>
                  <CreateNews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
