import asyncHandler from 'express-async-handler';
import express from 'express';
//import { movieReviews } from './moviesData';
import {
    getUpcomingMovies, getMovies, getMovie, getMovieReviews, getMovieImages
  } from '../tmdb-api';
//import uniqid from "uniqid";
//import movieModel from "./movieModel";

const router = express.Router(); 

router.get('/',  asyncHandler(async (req, res) => {
    let { page = 1} = req.query; // destructure page and limit and set default values
    page = +page; //trick to convert to numeric (req.query will contain string values)
    const movies = await getMovies(page);
    res.status(200).json(movies);
}));




router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    let { page = 1} = req.query; // destructure page and limit and set default values
    page = +page; //trick to convert to numeric (req.query will contain string values)
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    //const movie = await movieModel.findByMovieDBId(id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    //const movie = await movieModel.findByMovieDBId(id);
    const images = await getMovieImages(id);
    if (images) {
        res.status(200).json(images);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    //const movie = await movieModel.findByMovieDBId(id);
    const reviews = await getMovieReviews(id);
    if (reviews) {
        res.status(200).json(reviews);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

/*
//Post a movie review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});
*/

export default router;



