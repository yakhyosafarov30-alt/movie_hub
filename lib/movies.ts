import fs from "fs";
import path from "path";
import { Movie } from "@/types/movie";

// Barcha filmlarni olish
export async function getMovies(): Promise<Movie[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "movies.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const movies: Movie[] = JSON.parse(jsonData);
    return movies;
  } catch (error) {
    console.error("❌ movies.json o‘qishda xatolik:", error);
    return [];
  }
}

// ID bo‘yicha bitta filmni topish
export async function getMovieById(id: string): Promise<Movie | null> {
  try {
    const movies = await getMovies();
    const movie = movies.find((m) => m.id.toString() === id);
    return movie || null;
  } catch (error) {
    console.error("❌ getMovieById xatolik:", error);
    return null;
  }
}
