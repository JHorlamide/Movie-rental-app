import config from "config";
import winston from "winston";
import "winston-mongodb";

const colorizer = winston.format.colorize();
const { combine, printf, simple, } = winston.format;

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    data: 2,
    info: 3,
    debug: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  colors: {
    error: "red",
    warn: "orange",
    data: "grey",
    info: "green",
    debug: "yellow",
    verbose: "cyan",
    silly: "magenta",
    custom: "blue",
  },
};
colorizer.addColors(myCustomLevels.colors);

const logger = winston.createLogger({
  // format: winston.format.simple(),
  default: { server: "user-service" },
  colorize: true,
  prettyPrint: true,
  levels: myCustomLevels.levels,
  format: combine(
    simple(),
    printf((msg) => {
      return colorizer.colorize(msg.level, `${msg.level} - ${msg.message}`);
    })
  ),

  transports: [
    new winston.transports.Console({
      level: "info",
      colorize: true,
      prettyPrint: true,
    }),

    /* Logging error with level: error to error.log file */
    new winston.transports.File({
      filename: "errors.log",
      level: "error",
    }),

    /* Logging error with level: error to mongodb */
    // new winston.transports.MongoDB({
    //   db: config.get("mongoURI"),
    //   level: "error",
    //   option: {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //   },
    // }),
  ],

  /*
  ========================================
  Handling uncaughtException with winston
  ========================================
  */
  exceptionHandlers: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      level: "error",
      levels: myCustomLevels.levels,
    }),

    new winston.transports.File({
      filename: "exceptions.log",
      handleExceptions: true,
      level: "error",
    }),
  ],

  /*
  ========================================
  Handling unHandleRejection with winston
  ========================================
  */
  rejectionHandlers: [
    new winston.transports.File({
      filename: "exceptions.log",
      handleRejections: true,
    }),
  ],
});

export default logger;

/* Handling Uncaught Exceptions. NOTE: This is synchronous.*/
// process.on("uncaughtException", (exeception) => {
//   console.log("GOT AN UNCAUGHT EXECEPTION");
//   logger.error(exeception.message, exeception);
//   process.exit(1);

// });

/* Handling UnHandled Rejection. */
// process.on("unhandledRejection", (exeception) => {
//   throw new Error(exeception);
// });
