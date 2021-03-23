import express from "express";

/* Custom Route */
import genresRoute from "../routes/genres.js";
import customersRoute from "../routes/customers.js";
import moviesRoute from "../routes/movies.js";
import rentalRoute from "../routes/rentals.js";
import userRoute from "../routes/users.js";
import authRoute from "../routes/auth.js";
import error from "../middleware/error.js";

const route = (app) => {
  app.use(express.json());
  app.use("/api/genres", genresRoute);
  app.use("/api/customers", customersRoute);
  app.use("/api/movies", moviesRoute);
  app.use("/api/rentals", rentalRoute);
  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
  app.use(error);
};

export default route;
