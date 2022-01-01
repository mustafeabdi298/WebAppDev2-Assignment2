import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

const RemoveFromWishlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    context.removeFromWishlist(movie);
    authContext.removeFromWishlist(movie);
  };
  return (
    <IconButton
      aria-label="remove from wishlist"
      onClick={handleRemoveFromWishlist}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWishlistIcon;