export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  language: string;
  duration: string;
  ageLimit: string;
  description: string;
  posterUrl: string;
  trailerUrl?: string;
  category: "tarjima" | "serial" | "multfilm"; // 🔹 Bu qatorni qo‘shing
}
