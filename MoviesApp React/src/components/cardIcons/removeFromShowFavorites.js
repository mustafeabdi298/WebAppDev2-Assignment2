import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

const RemoveFromShowFavoritesIcon = ({ show }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();
    context.removeFromShowFavorites(show);
    authContext.removeFromShowFavourites(show);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromShowFavoritesIcon;