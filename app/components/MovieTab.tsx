"use client";

import React, { useState } from "react";
import { Movie } from "@/types/movie";
import movies from "@/public/data/movies.json";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

type Category = {
  key: string;
  title: string;
};

export default function MovieTabClient() {
  const allMovies: Movie[] = movies as Movie[];
  const categories: Category[] = [
    { key: "tarjima", title: "🎥 Tarjima Kinolar" },
    { key: "serial", title: "📺 Seriallar" },
    { key: "multfilm", title: "🎬 Multfilmlar" },
  ];

  const [hovered, setHovered] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-10 px-6 py-10">
      {categories.map((cat: Category) => {
        const filtered: Movie[] = allMovies.filter(
          (m) => m.category === cat.key
        );
        if (!filtered.length) return null;

        return (
          <section key={cat.key}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{cat.title}</h2>
            </div>

            <div
              onMouseEnter={() =>
                setHovered((prev) => ({ ...prev, [cat.key]: true }))
              }
              onMouseLeave={() =>
                setHovered((prev) => ({ ...prev, [cat.key]: false }))
              }
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={2}
                navigation
                // pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5 },
                }}
                className="mySwiper"
              >
                {filtered.map((movie: Movie) => (
                  <SwiperSlide key={movie.id}>
                    <MovieCard movie={movie} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        );
      })}
    </div>
  );
}
