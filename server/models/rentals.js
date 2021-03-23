import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectIdValidation from "../startup/validation.js";

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        trim: true,
        minLenth: 5,
        maxLenth: 255,
        required: true,
      },

      isGold: {
        type: Boolean,
        default: false,
      },

      phone: {
        type: String,
        required: true,
        min: 5,
        max: 50,
      },
    }),
    required: true,
  },

  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
      },

      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },

  dateout: {
    type: Date,
    default: Date.now,
    required: true,
  },

  dateReturned: {
    type: Date,
  },

  rentalFeet: {
    type: Number,
    min: 0,
  },
});

export const Rental = mongoose.model("Rental", rentalSchema);

export const validation = (rental) => {
  const schema = Joi.object({
    customerId: JoiObjectIdValidation(),
    movieId: JoiObjectIdValidation(),
  });

  return schema.validate(rental);
};
