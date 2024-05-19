import React from 'react';
import { getUpcomingMovies } from '../../util';
import MovieCard from '../movieCard'; // Assuming you have a MovieCard component for displaying individual movies
import Spinner from '../spinner'; // Assuming you have a Spinner component for loading state

const UpcomingMovies = ({ movies }) => {
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
