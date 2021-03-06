import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import img from '../../images/film-poster-placeholder.png'
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

const useStyles = makeStyles({
    card: {maxWidth: 345},
    media: {height: 500},
    avatar: {
        backgroundColor: "rgb(255, 0, 0)",
    },
});

export default function MovieCard({ movie, action }) {
  const classes = useStyles();
  const { favorites, addToFavorites } = useContext(AuthContext);
  const { wishlist, addToWishlist} = useContext(AuthContext);

  if(favorites.find(element => element.id === movie.id)){
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  if (wishlist.find((element) => element.id === movie.id)){
    movie.wishlist = true;
  } else {
    movie.wishlist = false;
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(movie);
  }

    return(
        <Card className={classes.card}>
        <CardHeader
        className = {classes.header}
        avatar = {
          movie.favorite ? (
            <Avatar className = {classes.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : movie.wishlist ? ( 
          <Avatar className = {classes.avatar}>
            <PlaylistAddCheckIcon/>
          </Avatar>
          ) : null
        }
        title = {
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
            }}
            style={{textDecoration: "none", color: "black"}}
          >
            <Typography variant="h5">
              {movie.title}{""}
            </Typography>
          </Link>
        }
        />
        <CardMedia
          className={classes.media}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : img
          }
        />
        <CardContent>
          <Grid container>
            <Grid item xs = {1}/>
            <Grid item xs={6}>
              <Typography variant="h6" component="p">
                <CalendarIcon fontSize="small" />
                {movie.release_date}
              </Typography>
              <Typography variant="h6" component="p">
                <StarRateIcon fontSize="small" />
                {"  "} {movie.vote_average}{" "}
              </Typography>
            </Grid>
            <Grid item xs = {1}/>
            <Grid item xs = {4}>
            <CardActions disableSpacing>
              {action(movie)}
            </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
}