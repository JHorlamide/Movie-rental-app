import Genre from "../models/genres.js";
import asyncMiddleware from "../middleware/async.js";
import mongoose from "mongoose";

/* Custom Modules */
import { validation } from "../models/genres.js";

/* GET: Get all genres */
export const getAllGenres = async (req, res, next) => {
  const genres = await Genre.find();
  res.send(genres);
};

/* GET: Get single genres */
export const getSingleGenres = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const genre = await Genre.findById(id);

  if (!genre) {
    return res.status(404).send("There is no genre with the given id");
  }

  res.send(genre);
});

/* CREATE: Create new genre */
export const createGenre = asyncMiddleware(async (req, res) => {
  const { name } = req.body;

  const { error, value } = validation({ name });

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const genres = new Genre(value);

  await genres.save();

  res.send(genres);
});

/* Update Genre */
export const updateGenre = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updateGenre = {};

  let genre = Genre.findById(id);

  if (!genre) {
    return res.status(404).send("There is no genre with the given id");
  }

  if (name) updateGenre.name = name;

  const { error, value } = validation(updateGenre);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  genre = await Genre.findByIdAndUpdate(id, { $set: value }, { new: true });

  res.send(genre);
});

/* DELETE: Delete genre */
export const deleteGenre = asyncMiddleware(async (req, res) => {
  const { id } = req.params;

  const genre = Genre.findById(id);

  if (!genre) {
    return res.status(404).json({ msg: error.details[0].message });
  }

  await Genre.findByIdAndRemove(id);

  res.send(`Genre removed`);
});
