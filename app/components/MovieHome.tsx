"use client";

import React, { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MovieHome() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("/movies.json")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("JSON yuklashda xatolik:", err));
  }, []);

  return (
    <section className="py-10 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        🎬 Eng Yangi Filmlar
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Yuklanmoqda...
        </p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
