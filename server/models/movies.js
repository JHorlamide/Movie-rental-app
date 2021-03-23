import mongoose from "mongoose";
import { genreSchema } from "./genres.js";
import Joi from "joi";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minLength: 5,
    maxLength: 255,
  },

  genre: {
    type: genreSchema,
    required: true,
  },

  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },

  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
});

export const validation = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
  });

  return schema.validate(movie);
};

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
