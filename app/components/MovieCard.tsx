import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster =
    movie.posterUrl && movie.posterUrl.length > 0
      ? movie.posterUrl
      : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={poster}
          alt={movie.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
      </div>
      <h3 className="mt-3 text-lg font-semibold group-hover:text-red-500 transition">
        {movie.title}
      </h3>
    </Link>
  );
}
