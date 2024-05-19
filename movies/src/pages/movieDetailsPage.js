// src/pages/movieDetailsPage.js
import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits, getMovieRecc } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const MoviePage = () => {
  const { id } = useParams();

  const { data: movie, error: movieError, isLoading: movieLoading, isError: movieIsError } = useQuery(
    ["movie", { id }],
    getMovie
  );
  
  const { data: credits, error: creditsError, isLoading: creditsLoading, isError: creditsIsError } = useQuery(
    ["credits", { id }],
    () => getMovieCredits(id),
    {
      enabled: !!movie,
    }
  );

  const { data: recommendations, error: reccError, isLoading: reccLoading, isError: reccIsError } = useQuery(
    ["recommendations", { id }],
    () => getMovieRecc(id),
    {
      enabled: !!movie,
    }
  );

  if (movieLoading || creditsLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <h1>{movieError.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }

  if (reccIsError) {
    return <h1>{reccError.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} credits={credits} recommendations={recommendations.results} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
