import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  
  const [favorites, setFavorites] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [myReviews, setMyReviews] = useState({});

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    console.log("Adding to favorites:", newFavorites);
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    const newFavorites = favorites.filter(mId => mId !== movie.id);
    console.log("Removing from favorites:", newFavorites);
    setFavorites(newFavorites);
  };

  const addToPlaylist = (movie) => {
    let newPlaylist = [];
    if (!playlist.includes(movie.id)){
      newPlaylist = [...playlist, movie.id];
    }
    else{
      newPlaylist = [...playlist];
    }
    console.log("Adding to playlist:", newPlaylist);
    setPlaylist(newPlaylist);
  };
  
  const removeFromPlaylist = (movie) => {
    const newPlaylist = playlist.filter(mId => mId !== movie.id);
    console.log("Removing from playlist:", newPlaylist);
    setPlaylist(newPlaylist);
  };

  const addReview = (movie, review) => {
    const newReviews = { ...myReviews, [movie.id]: review };
    console.log("Adding review:", newReviews);
    setMyReviews(newReviews);
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        playlist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
