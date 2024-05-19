import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";

const PlaylistMoviesPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run them in parallel.
  const playlistMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  // Check if any of the parallel queries are still loading.
  const isLoading = playlistMovieQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = playlistMovieQueries.map((q) => {
    if (q.isError) {
      console.error("Error fetching movie data:", q.error);
      return null;
    }
    if (q.data) {
      q.data.genre_ids = q.data.genres.map((g) => g.id);
      return q.data;
    }
    return null;
  }).filter((movie) => movie !== null); // Filter out any null values

  const toDo = () => true;

  return (
    <PageTemplate
      title="Watchlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromPlaylist movie={movie} />
          </>
        );
      }}
    />
  );
};

export default PlaylistMoviesPage;
