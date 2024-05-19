// src/components/upcomingMovies/UpcomingMovies.js
import React from 'react';
import { useQuery } from 'react-query';
import { getUpcomingMovies } from '../../util';
import MovieCard from '../movieCard';
import Spinner from '../spinner';

const fetchUpcomingMovies = async () => {
  const data = await getUpcomingMovies();
  return data.results; // Assuming the API returns an object with a 'results' array
};

const UpcomingMovies = () => {
  const { data: movies, error, isLoading } = useQuery('upcomingMovies', fetchUpcomingMovies);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Upcoming Movies</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
