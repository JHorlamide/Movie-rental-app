import logger from "../startup/error_handler.js";

const error = (error, req, res, next) => {
  logger.error(error.message, error);
  
  res
    .status(500)
    .json({ message: "Internal Server Error. Could not perform request" });
};

export default error;
