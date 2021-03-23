import { Rental, validation } from "../models/rentals.js";
import mongoose from "mongoose";
import Customer from "../models/customers.js";
import Movie from "../models/movies.js";
import Fawn from "fawn";
import asyncMiddleware from "../middleware/async.js";

Fawn.init(mongoose);

export const getAllRentals = asyncMiddleware(async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

export const creatNewRental = asyncMiddleware(async (req, res) => {
  const { customerId, movieId } = req.body;

  const { error } = validation({ customerId, movieId });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const customer = await Customer.findById(customerId);
  if (!customer) {
    return res
      .status(404)
      .json({ message: "There is no customer with given Id" });
  }

  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(404).json({ message: "There is no movie with given id" });
  }

  if (movie.dailyRentalRate === 0) {
    return res.status(400).json({ message: "Movie not in stock" });
  }

  let rental = new Rental({
    customer: {
      isGold: customer.isGold,
      name: customer.name,
      phone: customer.phone,
      _id: customer._id,
    },

    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      _id: movie._id,
    },
  });

  new Fawn.Task()
    .save("rentals", rental)
    .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
    .run();

  res.send(rental);
});
