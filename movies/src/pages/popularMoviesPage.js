import React, { useState, useEffect } from 'react';
import PopularMovies from '../components/popularMovies';
import PageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner'; // Assuming you have a Spinner component for loading state
import { getPopularMovies } from '../util'; // Import the data fetching function
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

const PopularMoviesPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);


  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
  );
};

export default PopularMoviesPage;

