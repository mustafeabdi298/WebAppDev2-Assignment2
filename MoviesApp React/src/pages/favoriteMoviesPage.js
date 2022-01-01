import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { AuthContext } from "../contexts/authContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites} = useContext(AuthContext);
  
  return (
    <PageTemplate
      title="Favourite Movies"
      movies={favorites}
      action={(movie) => {
        return(
          <>
          <RemoveFromFavorites movie = {movie}/>
          <WriteReview movie = {movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;