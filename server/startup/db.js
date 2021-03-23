import mongoose from "mongoose";
import config from "config";
import debug from "debug";

/* Custom module */
import logger from "./error_handler.js";

const db_uri = config.get("mongoURI");
const test_db_url = config.get("testDB");
const dbConnection = debug("app:db");

const connectDB = async () => {
  await mongoose.connect(test_db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  logger.info(`Connected to ${test_db_url}...`);
  dbConnection(`Connected to ${test_db_url}...`);

  // dbConnection("Mongodb connected");
};

export default connectDB;
