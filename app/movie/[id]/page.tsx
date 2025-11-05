"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import moviesData from "@/public/data/movies.json";
import { Movie } from "@/types/movie";

export default function MoviePage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const movieId = parseInt(id, 10);
    const found = (moviesData as Movie[]).find((m) => m.id === movieId);

    if (found) {
      setMovie(found);
      if (found.trailerUrl) {
        const embedUrl = found.trailerUrl.replace("watch?v=", "embed/");
        setCurrentVideo(embedUrl);
      }
    } else {
      setMovie(null);
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-xl">
        Yuklanmoqda...
      </div>
    );
  }

  // 🔹 Qismlar (namuna uchun)
  const parts = [
    {
      name: "1-qism",
      url: movie.trailerUrl?.replace("watch?v=", "embed/") || "",
    },
    { name: "2-qism", url: "https://www.youtube.com/embed/tgbNymZ7vqY" },
    { name: "3-qism", url: "https://www.youtube.com/embed/sBws8MSXN7A" },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-white">
      {/* 🔹 Asosiy film ma’lumotlari */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-[#1b1f2a] p-6 rounded-2xl shadow-lg">
        {/* Poster */}
        <div className="flex justify-center">
          <div className="relative w-[320px] h-[480px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={
                movie.posterUrl ||
                "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Ma’lumotlar */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 leading-relaxed">{movie.description}</p>

          <div className="space-y-2 text-sm md:text-base mt-4">
            <InfoRow label="JANR" value="Tarjima / Melodrama / Serial" />
            <InfoRow label="DAVLATI" value="Janubiy Koreya" />
            <InfoRow label="YILI" value={movie.year.toString()} />
            <InfoRow label="TILI" value="O‘zbek tilida (Tarjima)" />
            <InfoRow label="DAVOMIYLIGI" value={movie.duration} />
            <InfoRow label="YOSH CHEGARASI" value={movie.ageLimit || "16+"} />
          </div>

          {/* Like / dislike */}
          <div className="flex items-center gap-4 mt-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-700 rounded-lg hover:bg-green-800 transition">
              👍 <span className="text-sm">22</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-700 rounded-lg hover:bg-red-800 transition">
              👎 <span className="text-sm">2</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Video player pastda doim chiqadi */}
      <div className="mt-10 bg-[#1b1f2a] p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          🎬 {movie.title} — Tomosha qilish
        </h2>

        {/* Qismlar tugmalari */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {parts.map((part, i) => (
            <button
              key={i}
              onClick={() => setCurrentVideo(part.url)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentVideo === part.url
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {part.name}
            </button>
          ))}
        </div>

        {/* YouTube video player */}
        {currentVideo ? (
          <div className="aspect-video w-full rounded-xl overflow-hidden">
            <iframe
              src={currentVideo}
              title={movie.title}
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <p className="text-center text-gray-400">Video mavjud emas 😢</p>
        )}
      </div>

      {/* 🔹 Boshqa kinolar */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">🎥 Boshqa kinolar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {(moviesData as Movie[])
            .filter((m) => m.id !== movie.id)
            .slice(0, 8)
            .map((m) => (
              <div
                key={m.id}
                className="bg-gray-800/40 rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <Image
                  src={
                    m.posterUrl ||
                    "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={m.title}
                  width={300}
                  height={450}
                  className="object-cover w-full h-auto"
                />
                <p className="p-3 text-center text-gray-300 text-sm">
                  {m.title}
                </p>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between bg-[#2a2f3a] p-3 rounded-md">
      <span className="text-gray-400 font-medium">{label}</span>
      <span>{value}</span>
    </div>
  );
}
