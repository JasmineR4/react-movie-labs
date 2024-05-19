import React from 'react';
import { useQuery } from 'react-query';
import { getTopMovies } from '../../util';
import MovieCard from '../movieCard';
import Spinner from '../spinner';

const fetchTopMovies = async () => {
  const data = await getTopMovies();
  return data.results; // Assuming the API returns an object with a 'results' array
};

const TopMovies = () => {
  const { data: movies, error, isLoading } = useQuery('TopMovies', fetchTopMovies);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Top Rated Movies</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopMovies;
