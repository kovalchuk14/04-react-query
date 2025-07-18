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
import ReactPaginate from 'react-paginate';
import css from './App.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

function App() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["request", title, currentPage],
    queryFn: () => fetchMovies(title, currentPage),
    enabled: title !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;


  async function handleSubmit(title: string) {

    setTitle(title);
    setCurrentPage(1);

    if (data && data.results.length === 0) toast.error("there is no movie");
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
      {totalPages > 1 && <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />}
      {data && data.results.length > 0 && <MovieGrid onSelect={openCard} movies={data.results} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {(selectedMovie) && <MovieModal movie={selectedMovie} onClose={closeCard} />}
    </>
  );
}

export default App
