import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { AuthContext } from "../contexts/authContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWishlist from "../components/cardIcons/removeFromWishlist";

const WishlistPage = () => {
  const {wishlist} = useContext(AuthContext);

  return (
    <PageTemplate
      title="Wishlist"
      movies={wishlist}
      action={(movie) => {
        return(
          <>
          <RemoveFromWishlist movie = {movie}/>
          </>
        );
      }}
    />
  );
};

export default WishlistPage;