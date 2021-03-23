import Movie from "../models/movies.js";
import Genre from "../models/genres.js";
import { validation } from "../models/movies.js";
import asyncMiddleware from "../middleware/async.js";

export const getAllMovies = asyncMiddleware(async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

export const createMovie = asyncMiddleware(async (req, res) => {
  const { title, genreId, numberInStock, dailyRentalRate } = req.body;

  const { error } = validation({
    title,
    genreId,
    numberInStock,
    dailyRentalRate,
  });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const genre = await Genre.findById(genreId);

  if (!genre) {
    return res
      .status(404)
      .json({ message: "There is no genre with the given Id." });
  }

  const movie = new Movie({
    title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock,
    dailyRentalRate,
  });

  await movie.save();

  res.send(movie);
});
