import React, { useState, createContext } from "react";
import { login, signup, 
  addFavouriteMovie, getFavouriteMovies, removeFavouriteMovie, 
  addWishlistMovie, getWishlistMovies, removeWishlistMovie,
  addShowFavouriteMovie, getShowFavouriteMovies, removeShowFavouriteMovie, 
  addMovieReview, addShowReview, getMovieReviews, getShowReviews
} from "../api/movie-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showFavorites, setShowFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [myShowReviews, setMyShowReviews] = useState({});
  const [specificMovieReviews, setSpecificMovieReviews] = useState({});
  const [specificShowReviews, setSpecificShowReviews] = useState({});

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
      setFavorites(await getFavouriteMovies(username));
      setWishlist(await getWishlistMovies(username));
      setShowFavorites(await getShowFavouriteMovies(username));
    }
  };

  const getMyMovieReviews = async (movieId) => {
    setSpecificMovieReviews(await getMovieReviews(movieId));
  }

  const getMyShowReviews = async (showId) => {
    setSpecificShowReviews(await getShowReviews(showId));
  }

  const addToFavorites = (movie) => {
    if(!favorites.includes(movie)){
    setFavorites([...favorites, movie])
    addFavouriteMovie(userName, movie.id);
    }
  };

  const removeFromFavourites = (movie) => {    
    if(favorites.includes(movie)){
    const index = favorites.indexOf(movie);
    favorites.splice(index, 1);
    }
    setFavorites([...favorites]);    
    removeFavouriteMovie(userName, movie.id);
  }

  const addToWishlist = (movie) => {
    if(!wishlist.includes(movie)){
    setWishlist([...wishlist, movie])
    addWishlistMovie(userName, movie.id);
    }
  };

  const removeFromWishlist = (movie) => {    
    if(wishlist.includes(movie)){
    const index = wishlist.indexOf(movie);
    wishlist.splice(index, 1);
    }
    setWishlist([...wishlist]);    
    removeWishlistMovie(userName, movie.id);
  }

  const addToShowFavorites = (show) => {
    if(!showFavorites.includes(show)){
    setShowFavorites([...showFavorites, show])
    addShowFavouriteMovie(userName, show.id);
    }
  };

  const removeFromShowFavourites = (show) => {    
    if(showFavorites.includes(show)){
    const index = showFavorites.indexOf(show);
    showFavorites.splice(index, 1);
    }
    setShowFavorites([...showFavorites]);    
    removeShowFavouriteMovie(userName, show.id);
  }

  const addReview = (review) => {
    setMyReviews({...myReviews, review})
    console.info("1: " + review.authorName + "\n2: " +  review.text + "\n3: " + review.rating + "\n4: " + review.movieId)
    addMovieReview(review.authorName, review.text, review.rating, review.movieId, userName)
  };

  const addReviewShow = (review) => {
    setMyShowReviews({...myShowReviews, review})
    console.info("1: " + review.authorName + "\n2: " +  review.text + "\n3: " + review.rating + "\n4: " + review.movieId)
    addShowReview(review.authorName, review.text, review.rating, review.showId, userName)
  }

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);
    return (result.code === 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
    setUserName("");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        addToFavorites,
        removeFromFavourites,
        favorites,
        addToWishlist,
        removeFromWishlist,
        wishlist,
        addToShowFavorites,
        removeFromShowFavourites,
        showFavorites,
        addReview,
        myReviews,
        addReviewShow,
        myShowReviews,
        getMyMovieReviews,
        specificMovieReviews,
        setSpecificMovieReviews,
        getMyShowReviews,
        specificShowReviews,
        setSpecificShowReviews
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;