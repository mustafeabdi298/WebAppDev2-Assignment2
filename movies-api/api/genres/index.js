import express from "express";
import {
    getMovieGenres, getShowGenres
} from "../tmdb-api";

const router = express.Router();

router.get("/movies", async(req, res) => {
    const genres = await getMovieGenres();
    res.status(200).json(genres);
});

router.get("/shows", async(req, res) => {
    const genres = await getShowGenres();
    res.status(200).json(genres);
});

export default router;


