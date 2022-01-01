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
import { getShowReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { AuthContext } from "../../contexts/authContext";

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});

export default function ShowReviews({ show }) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const context = useContext(AuthContext);
  const {specificShowReviews} = useContext(AuthContext);
  const correctShowReviews = [];

  useEffect(() => {
    
    context.getMyShowReviews(show.id);

    getShowReviews(show.id).then((reviews) => {

      for(let i = 0; i < reviews.length; i++){
        let element = reviews[i];
        correctShowReviews.unshift({
          id: element.id,
          author: element.author,
          content: element.content,
        })
      }

      for(let i = 0; i < specificShowReviews.length; i++){
        let element = specificShowReviews[i];
        correctShowReviews.unshift({
          id: element._id,
          author: element.authorName,
          content: element.text,
        })
      }

      setReviews(correctShowReviews);

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
                    pathname: `/tv/reviews/${r.id}`,
                    state: {
                      review: r,
                      show: show,
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