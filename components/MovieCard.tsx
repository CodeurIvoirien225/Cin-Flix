"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Star } from "lucide-react";
import { Movie } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group h-full rounded-lg overflow-hidden bg-card shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]">
        <div className="relative aspect-[2/3] overflow-hidden">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">pas d'image</p>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center text-sm">
            <Star className={cn("mr-1 h-3 w-3", movie.vote_average >= 7 ? "fill-chart-1 text-chart-1" : "")} />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-card-foreground line-clamp-1 mb-2">
            {movie.title}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}