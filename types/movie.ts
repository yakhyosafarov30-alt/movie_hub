export interface Movie {
  id: number;
  title: string;
  year?: number;
  rating?: number;
  language?: string;
  duration?: string;
  ageLimit?: string;
  description?: string;
  posterUrl: string;
  trailerUrl?: string; // 🔹 ixtiyoriy qilib qo‘shildi
  category: "tarjima" | "serial" | "multfilm";
  episodes?: { id: number; title: string }[];
}
