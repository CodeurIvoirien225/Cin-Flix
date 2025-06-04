"use client";

import { useState, useEffect } from "react";
import MovieGrid from "@/components/MovieGrid";
import SearchBar from "@/components/SearchBar";
import LoadingGrid from "@/components/LoadingGrid";
import { fetchPopularMovies, searchMovies } from "@/lib/api";
import { Movie } from "@/lib/types";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setLoading(true);

    if (term.trim() === "") {
      setFilteredMovies(movies);
      setLoading(false);
      return;
    }

    try {
      const results = await searchMovies(term);
      setFilteredMovies(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
        CinéFlix
        </h1>
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {loading ? (
          <LoadingGrid />
        ) : (
          <>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              {searchTerm ? `Results for "${searchTerm}"` : "Films populaires"}
            </h2>
            {filteredMovies.length > 0 ? (
              <MovieGrid movies={filteredMovies} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                Aucun film trouvé pour votre recherche.
                </p>
                <button 
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setSearchTerm("");
                    setFilteredMovies(movies);
                  }}
                >
                 Voir tous les films
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}