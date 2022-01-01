import express from 'express';
import User from './userModel';
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
//import movieModel from "../movies/movieModel";
import {getMovie, getShow} from "../tmdb-api";

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register
router.post('/',asyncHandler( async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
      return next();
    }
    if (req.query.action === 'register') {
      if(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/).test(req.body.password)){
        if(!await User.findByUserName(req.body.username)){
          await User.create(req.body);
          res.status(201).json({code: 201, msg: 'Successful created new user.'});
        } else {
          res.status(401).json({code: 401, msg: "Username taken."});
        }
      } else {
        res.status(401).json({code: 401, msg: "Invalid password."});
      }
    } else {
      const user = await User.findByUserName(req.body.username);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password matches, create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({success: true, token: 'BEARER ' + token});
          } else {
            res.status(401).json({code: 401,msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  }));

  /*
// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});
*/

//////////////
//Favourites//
//////////////

//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    //const movie = await movieModel.findByMovieDBId(newFavourite);
    //const movie = await getMovie(newFavourite);
    //console.info("movie: " + movie);
    const user = await User.findByUserName(userName);
    if(user.favourites.includes(newFavourite)){
      res.status(404).json({ code: 404, msg: 'Movie is already a favourite' });
    } else {
      await user.favourites.push(newFavourite);
      await user.save(); 
      res.status(201).json(user); }
  }));

  router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    //const user = await User.findByUserName(userName).populate('favourites');
    const user = await User.findByUserName(userName);
    const userFavourites = [];
    for(let i = 0; i < user.favourites.length; i++){
      userFavourites[i] = await getMovie(user.favourites[i]);
    }
    res.status(200).json(userFavourites);
  }));

  router.delete('/:userName/favourites', asyncHandler(async (req, res) => {
    const favourite = req.body.id;
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);
    if(user.favourites.includes(favourite)){
      const index = user.favourites.indexOf(favourite);
      await user.favourites.splice(index, 1);
      await user.save(); 
      res.status(201).json(user);
    } else {
      res.status(404).json({ code: 404, msg: 'Movie is not in favourites' });
    }
  }));

  ////////////
  //Wishlist//
  ////////////

  router.post('/:userName/wishlist', asyncHandler(async (req, res) => {
    const newWish = req.body.id;
    const userName = req.params.userName;
    //const movie = await movieModel.findByMovieDBId(newFavourite);
    //const movie = await getMovie(newFavourite);
    //console.info("movie: " + movie);
    const user = await User.findByUserName(userName);
    if(user.wishlist.includes(newWish)){
      res.status(404).json({ code: 404, msg: 'Movie is already in wishlist' });
    } else {
      await user.wishlist.push(newWish);
      await user.save(); 
      res.status(201).json(user); }
  }));

  router.get('/:userName/wishlist', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    //const user = await User.findByUserName(userName).populate('favourites');
    const user = await User.findByUserName(userName);
    const userWishlist = [];
    for(let i = 0; i < user.wishlist.length; i++){
      userWishlist[i] = await getMovie(user.wishlist[i]);
    }
    res.status(200).json(userWishlist);
  }));

  router.delete('/:userName/wishlist', asyncHandler(async (req, res) => {
    const wish = req.body.id;
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);
    if(user.wishlist.includes(wish)){
      const index = user.wishlist.indexOf(wish);
      await user.wishlist.splice(index, 1);
      await user.save(); 
      res.status(201).json(user);
    } else {
      res.status(404).json({ code: 404, msg: 'Movie is not in wishlist' });
    }
  }));

  //////////////////
  //ShowFavourites//
  //////////////////

  router.post('/:userName/showFavourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    //const movie = await movieModel.findByMovieDBId(newFavourite);
    //const movie = await getMovie(newFavourite);
    //console.info("movie: " + movie);
    const user = await User.findByUserName(userName);
    if(user.showFavourites.includes(newFavourite)){
      res.status(404).json({ code: 404, msg: 'Show is already a favourite' });
    } else {
      await user.showFavourites.push(newFavourite);
      await user.save(); 
      res.status(201).json(user); }
  }));

  router.get('/:userName/showFavourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    //const user = await User.findByUserName(userName).populate('favourites');
    const user = await User.findByUserName(userName);
    const userFavourites = [];
    for(let i = 0; i < user.showFavourites.length; i++){
      userFavourites[i] = await getShow(user.showFavourites[i]);
    }
    res.status(200).json(userFavourites);
  }));

  router.delete('/:userName/showFavourites', asyncHandler(async (req, res) => {
    const favourite = req.body.id;
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);
    if(user.showFavourites.includes(favourite)){
      const index = user.showFavourites.indexOf(favourite);
      await user.showFavourites.splice(index, 1);
      await user.save(); 
      res.status(201).json(user);
    } else {
      res.status(404).json({ code: 404, msg: 'Show is not in favourites' });
    }
  }));

export default router;