import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const AddToShowFavoritesIcon = ({ show }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToShowFavorites(show);
    authContext.addToShowFavorites(show);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites} size="large">
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToShowFavoritesIcon;