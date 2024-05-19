import React, { useState, useEffect } from 'react';
import TopMovies from '../components/topMovies';
import PageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner'; 
import { getTopMovies } from '../util';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

const TopMoviesPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTopMovies();
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
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
  );
};

export default TopMoviesPage;
