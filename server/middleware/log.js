export const log = (req, res, next) => {
  console.log("logging...");
  next();
};
