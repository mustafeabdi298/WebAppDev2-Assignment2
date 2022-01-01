import express from 'express';
import {
    getShows, getShow, getShowReviews, getShowImages
  } from '../tmdb-api';
//import uniqid from "uniqid";
import asyncHandler from "express-async-handler";

const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1} = req.query; // destructure page and limit and set default values
    page = +page; //trick to convert to numeric (req.query will contain string values)
    const shows = await getShows(page);
    res.status(200).json(shows);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const show = await getShow(id);
    if (show) {
        res.status(200).json(show);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    //const movie = await movieModel.findByMovieDBId(id);
    const images = await getShowImages(id);
    if (images) {
        res.status(200).json(images);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    //const movie = await movieModel.findByMovieDBId(id);
    const reviews = await getShowReviews(id);
    if (reviews) {
        res.status(200).json(reviews);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

export default router;