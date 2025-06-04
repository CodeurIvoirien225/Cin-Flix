import { Movie, MovieDetails } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(): Promise<Movie[]> {
  try {
    if (!API_KEY) {
      throw new Error("TMDB API key is not configured");
    }

    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching popular movies: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch popular movies:", error);
    return [];
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    if (!API_KEY) {
      throw new Error("TMDB API key is not configured");
    }

    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1&include_adult=false`
    );
    
    if (!response.ok) {
      throw new Error(`Error searching movies: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to search movies:", error);
    return [];
  }
}

export async function fetchMovieDetails(movieId: string): Promise<MovieDetails> {
  try {
    if (!API_KEY) {
      throw new Error("TMDB API key is not configured");
    }

    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching movie details: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch details for movie ${movieId}:`, error);
    throw error;
  }
}