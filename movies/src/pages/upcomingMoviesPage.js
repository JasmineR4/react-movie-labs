import React, { useState, useEffect } from 'react';
import UpcomingMovies from '../components/upcomingMovies/upcomingMovies.js';
import PageTemplate from "../components/templateMovieListPage";
import Spinner from '../components/spinner'; // Assuming you have a Spinner component for loading state
import { getUpcomingMovies } from '../util'; // Import the data fetching function
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

const UpcomingMoviesPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const toDo = () => true; // Define the toDo function here

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
  );
};

export default UpcomingMoviesPage;
