"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Search, LogIn, Film, Sun, Moon } from "lucide-react";
import Link from "next/link";
import moviesData from "@/public/data/movies.json"; // 🔹 JSON filmlarni import qilish
import { Movie } from "@/types/movie";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  // 🔹 Theme boshqaruvi
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // 🔹 Qidiruv funksiyasi
  useEffect(() => {
    if (query.trim().length === 0) {
      setFilteredMovies([]);
      return;
    }

    const results = (moviesData as Movie[]).filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(results.slice(0, 6)); // faqat 6 ta natija chiqadi
  }, [query]);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Film className="w-6 h-6" />
            <span>MovieHub</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-gray-200 transition-colors">
              Home
            </Link>
            <Link
              href="/movies"
              className="hover:text-gray-200 transition-colors"
            >
              Movies
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-200 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-200 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 relative">
            {/* 🔍 Search */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-lg px-2 py-1 relative">
              <Search className="w-4 h-4 text-gray-200" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none px-2 text-sm text-gray-100 placeholder-gray-300"
              />

              {/* 🔹 Qidiruv natijalari */}
              {filteredMovies.length > 0 && (
                <div className="absolute top-10 left-0 w-64 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg overflow-hidden z-50">
                  {filteredMovies.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      onClick={() => {
                        setQuery("");
                        setFilteredMovies([]);
                      }}
                    >
                      🎬 {movie.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 🔘 Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* 🔐 Login */}
            <button className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition">
              <LogIn className="w-4 h-4" /> Sign in
            </button>

            {/* 📱 Mobile Menu */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 dark:bg-gray-900 px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-gray-200">
            Home
          </Link>
          <Link href="/movies" className="block hover:text-gray-200">
            Movies
          </Link>
          <Link href="/about" className="block hover:text-gray-200">
            About
          </Link>
          <Link href="/contact" className="block hover:text-gray-200">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
