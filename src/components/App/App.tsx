//import { useState } from 'react'
import './App.module.css'
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSubmit(title: string) {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);
    try { 
      const movieList: Movie[] = await fetchMovies(title);
      if (movieList.length === 0) toast.error("there is no movie");
      setMovies(movieList);
    } catch (error) { 
      console.log(error);
      setIsError(true);
    }
    setIsLoading(false);
  }

  function openCard(movie: Movie) {
    setSelectedMovie(movie);
  }

  function closeCard() {
    setSelectedMovie(null);
  }


  return (
    <>
      <Toaster
                position="top-center"
                reverseOrder={false}
            />
      <SearchBar onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieGrid onSelect={openCard} movies={movies}/>}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      { (selectedMovie) && <MovieModal  movie={selectedMovie} onClose={closeCard}/>}
    </>
  );
}

export default App
