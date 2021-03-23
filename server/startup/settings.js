import config from "config";
import logger from "./error_handler.js";

/* Configuration settings for Json Web Token */
export const configSetting = () => {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: JwtPrivateKey is not defined");
  }
};

/* Checking NODE_ENV */
export const NODE_ENV = () => {
  if (process.env.NODE_ENV !== "production") {
    logger.info("NODE_ENV NOT IN PRODUCTION.");
  }
};
