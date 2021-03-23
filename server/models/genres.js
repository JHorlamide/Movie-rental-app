import mongoose from "mongoose";
import Joi from "joi";

export const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 30,
  },
});

export const validation = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
  });

  return schema.validate(genre);
};

const Genre = mongoose.model("Genre", genreSchema);
export default Genre;
