import React, { useContext } from "react";
import PageTemplate from "../components/templateShowListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { AuthContext } from "../contexts/authContext";
import { useQueries } from "react-query";
import { getShow } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromShowFavorites from "../components/cardIcons/removeFromShowFavorites";
import WriteShowReviewIcon from "../components/cardIcons/writeShowReview";

const FavoriteMoviesPage = () => {
  const {showFavorites} = useContext(AuthContext);

  return (
    <PageTemplate
      title="Favourite Shows"
      shows={showFavorites}
      action={(show) => {
        return (
          <>
          <RemoveFromShowFavorites show={show} />
          <WriteShowReviewIcon show={show} />
          </>
        )
      }}
    />
  );
};

export default FavoriteMoviesPage;