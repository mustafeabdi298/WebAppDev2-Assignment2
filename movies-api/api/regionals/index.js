import express from "express";
import {
    getCountries, getLanguages
} from "../tmdb-api";

const router = express.Router();

router.get("/countries", async(req, res) => {
    const countries = await getCountries();
    res.status(200).json(countries);
});

router.get("/languages", async(req, res) => {
    const languages = await getLanguages();
    res.status(200).json(languages);
});

export default router;