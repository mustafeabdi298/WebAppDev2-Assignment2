import "./db";
import './seedData';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from "./api/genres";
import usersRouter from './api/users';
import regionalsRouter from "./api/regionals";
import showsRouter from "./api/shows";
import reviewRouter from "./api/reviews";
import passport from "./authenticate";
import morgan from "morgan";
import fs from "fs";
import path from "path";


dotenv.config();

const errHandler = (err, req, res) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  // eslint-disable-next-line no-undef
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT;

// eslint-disable-next-line no-undef
const appLogStream = fs.createWriteStream(path.join(__dirname, 'log'), { flags: 'a' });
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body", {stream: appLogStream}));

app.use(passport.initialize());
app.use(express.json());
app.use('/api/movies', passport.authenticate("jwt", {session: false}), moviesRouter);
app.use("/api/genres", genresRouter);
app.use('/api/users', usersRouter);
app.use("/api/regionals", regionalsRouter);
app.use("/api/shows", showsRouter);
app.use("/api/reviews", reviewRouter);
app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});