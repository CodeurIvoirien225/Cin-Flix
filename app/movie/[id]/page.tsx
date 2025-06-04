"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { fetchMovieDetails } from "@/lib/api";
import { MovieDetails } from "@/lib/types";
import MovieDetailSkeleton from "@/components/MovieDetailSkeleton";

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        if (typeof id !== 'string') return;
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <MovieDetailSkeleton />;
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Film introuvable</h1>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity mx-auto"
          >
            <ArrowLeft size={18} />
            Retourner
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
        >
          <ArrowLeft size={18} />
          Retour aux films
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 relative aspect-[2/3] min-h-[450px] rounded-lg overflow-hidden shadow-xl">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Aucune image disponible</p>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-chart-1 mr-4">
                <Star className="fill-chart-1 mr-1" size={20} />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1">/ 10</span>
              </div>
              <div className="text-muted-foreground">
                {formatDate(movie.release_date)}
              </div>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span 
                    key={genre.id}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
              <p className="text-foreground/90 leading-relaxed">
                {movie.overview || "No synopsis available."}
              </p>
            </div>

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Production</h2>
                <p className="text-muted-foreground">
                  {movie.production_companies.map(company => company.name).join(', ')}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Durée</h3>
                <p>{movie.runtime ? `${movie.runtime} minutes` : "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Langue originale</h3>
                <p>{movie.original_language ? movie.original_language.toUpperCase() : "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Budget</h3>
                <p>{movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Revenue</h3>
                <p>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}