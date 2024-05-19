import React from 'react';
import { useQuery } from 'react-query';
import { getPopularMovies } from '../../util';
import MovieCard from '../movieCard';
import Spinner from '../spinner';

const fetchPopularMovies = async () => {
  const data = await getPopularMovies();
  return data.results; // Assuming the API returns an object with a 'results' array
};

const PopularMovies = () => {
  const { data: movies, error, isLoading } = useQuery('popularMovies', fetchPopularMovies);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
