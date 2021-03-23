import express from "express";

/* Custom Routes */
import { configSetting, NODE_ENV } from "./startup/settings.js";
import JoiObjectIdValidation from "./startup/validation.js";
import route from "./startup/route.js";
import connectDB from "./startup/db.js";
import logger from './startup/error_handler.js';

const PORT = process.env.PORT || 4000;

const app = express();

/* Initialize routes */
route(app);

/* Configuration settings  */
configSetting();

/* Checking node environment */
NODE_ENV();

/* Database Connection */
connectDB();

/* JoiObjectId Validation */
JoiObjectIdValidation();

const server = app.listen(PORT, () => {
  return logger.info(`Server started on port ${PORT}`);
});

export default server;