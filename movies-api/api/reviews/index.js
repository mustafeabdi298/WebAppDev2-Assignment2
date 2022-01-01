import express from "express";
import movieReview from "./movieReviewModel";
import showReview from "./showReviewModel";
import User from "../users/userModel";
import asyncHandler from "express-async-handler";

const router = express.Router();

//Get all reviews 
router.get("/", async (req, res) => {
    const reviews = await movieReview.find();
    res.status(200).json(reviews);
});

router.get("/shows", async (req, res) => {
    const showReviews = await showReview.find();
    res.status(200).json(showReviews);
});


//Add a review
router.post("/", asyncHandler( async (req, res, next) => {
    if(!req.body.authorName || !req.body.text || !req.body.rating || !req.body.movieId){
        res.status(401).json({success: false, msg: "Please fill in all the required fields"});
        return next();
    }
    const review = await movieReview.create(req.body);
    const user = await User.findByUserName(req.body.userName);
    await user.reviews.push(review._id);
    await user.save();
    res.status(201).json({code: 201, msg: "Succesfully added review"});
}));

//Add a review
router.post("/shows", asyncHandler( async (req, res, next) => {
    if(!req.body.authorName || !req.body.text || !req.body.rating || !req.body.showId){
        res.status(401).json({success: false, msg: "Please fill in all the required fields"});
        return next();
    }
    const review = await showReview.create(req.body);
    const user = await User.findByUserName(req.body.userName);
    await user.reviews.push(review._id);
    await user.save();
    res.status(201).json({code: 201, msg: "Succesfully added review"});
}));

router.get("/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    const movieReviews = await movieReview.findByMovieId(id);
    res.status(200).json(movieReviews);
});

router.get("/shows/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    const showReviews = await showReview.findByMovieId(id);
    res.status(200).json(showReviews);
});

export default router;