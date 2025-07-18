import axios from "axios";
import type { Movie } from "../types/movie";


export default async function fetchMovies(title: string):Promise<Movie[]> {
    const response = await axios.get<{ results: Movie[] }>(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`, {
        params: {
            // твої параметри
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }
    });

    return response.data.results;
}