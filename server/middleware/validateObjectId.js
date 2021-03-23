import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalide ID.");
  }

  next();
};

export default validateObjectId;
