export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  description?: string;
  year?: number;
  rating?: number;
  category: string; // 🔹 cheklov olib tashlandi
}
