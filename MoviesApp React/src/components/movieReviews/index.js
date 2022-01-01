import React, { useContext, useEffect, useState }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { AuthContext } from "../../contexts/authContext";

const useStyles = makeStyles({
    table: {
      minWidth: 550,
    },
  });

  export default function MovieReviews({ movie }) {
    const classes = useStyles();
    const [reviews, setReviews] = useState([]);
    const context = useContext(AuthContext);
    const {specificMovieReviews} = useContext(AuthContext);
    const correctMovieReviews = [];
  
    useEffect(() => {

      context.getMyMovieReviews(movie.id);

      getMovieReviews(movie.id).then((reviews) => {
        
        for(let i = 0; i < reviews.length; i++){
          let element = reviews[i];
          correctMovieReviews.unshift({
            id: element.id,
            author: element.author,
            content: element.content,
          })
        }
        for(let i = 0; i < specificMovieReviews.length; i++){
          let element = specificMovieReviews[i];
          correctMovieReviews.unshift({
            id: element._id,
            author: element.authorName,
            content: element.text,
          })
        }

        setReviews(correctMovieReviews);
        
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="reviews table">
          <TableHead>
            <TableRow>
              <TableCell >Author</TableCell>
              <TableCell align="center">Excerpt</TableCell>
              <TableCell align="right">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell component="th" scope="row">
                  {r.author}
                </TableCell>
                <TableCell >{excerpt(r.content)}</TableCell>
                <TableCell >
                  <Link
                    to={{
                      pathname: `/movies/reviews/${r.id}`,
                      state: {
                        review: r,
                        movie: movie,
                      },
                    }}
                  >
                    Full Review
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }