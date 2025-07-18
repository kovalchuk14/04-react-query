import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function fetchMovies(title: string, page: number) {
    const response = await axios.get<MoviesHttpResponse>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
            query: title,
            page: page,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }
    });

    return response.data;
}