"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";

interface HeroSliderProps {
  movies: Movie[];
}

export default function HeroSlider({ movies }: HeroSliderProps) {
  const filteredMovies = movies.filter((m) =>
    [8, 11, 30, 49].includes(Number(m.id))
  );

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || filteredMovies.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % filteredMovies.length);
        setFade(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [isClient, filteredMovies.length]);

  if (!isClient) {
    return (
      <section className="w-full h-[70vh] bg-black flex items-center justify-center text-white">
        <p>Yuklanmoqda...</p>
      </section>
    );
  }

  if (filteredMovies.length === 0) {
    return (
      <section className="w-full h-[70vh] flex items-center justify-center text-white bg-black">
        <p>🎬 id: 4, 8, 11, 16 bo‘lgan filmlar topilmadi.</p>
      </section>
    );
  }

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % filteredMovies.length);
      setFade(true);
    }, 300);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent(
        (prev) => (prev - 1 + filteredMovies.length) % filteredMovies.length
      );
      setFade(true);
    }, 300);
  };

  const movie = filteredMovies[current];
  const poster =
    movie.posterUrl && movie.posterUrl.length > 0
      ? movie.posterUrl
      : "https://via.placeholder.com/1280x720?text=No+Image";

  return (
    <section
      key={movie.id}
      className={`relative w-full h-[70vh] md:h-[85vh] flex items-end overflow-hidden bg-black transition-opacity duration-700 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="relative z-10 px-6 md:px-16 pb-12 md:pb-20 max-w-3xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          {movie.title}
        </h1>
        <p className="text-gray-300 mb-6 line-clamp-3 text-sm md:text-base">
          {movie.description}
        </p>
        <Link
          href={`/movie/${movie.id}`}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition shadow-lg"
        >
          ▶ Tomosha qilish
        </Link>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3"
      >
        ❯
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {filteredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? "bg-red-600 scale-110" : "bg-gray-400/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
