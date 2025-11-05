"use client";

import { useState } from "react";
import HeroSection from "@/app/components/HomeSection";
import MovieCard from "@/app/components/MovieCard";
import movies from "@/public/data/movies.json";
import { Movie } from "@/types/movie";
import MovieTab from "./components/MovieTab";
export default function HomePage() {
  const movieList = movies as Movie[];
  const [visibleCount, setVisibleCount] = useState(8);

  const heroMovie = movieList[0];
  const visibleMovies = movieList.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 🎬 Hero Section */}
      <HeroSection movies={movies} />

      {/* 🔹 Filmlar grid */}
      <section className="px-6 py-10 md:px-12">
        <MovieTab />
        {/* <h2 className="text-3xl font-semibold mb-6">Eng so‘nggi filmlar</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div> */}

        {/* 🔸 Load More tugmasi */}
        {visibleCount < movieList.length && (
          <div className="flex justify-center mt-10">
            {/* <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition shadow-md"
            >
              Ko‘proq yuklash
            </button> */}
          </div>
        )}
      </section>
    </main>
  );
}
