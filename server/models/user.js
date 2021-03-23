import mongoose from "mongoose";
import Joi from "joi";
import config from "config";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 255,
    required: true,
  },

  email: {
    type: String,
    minLength: 5,
    maxLength: 255,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    minLength: 5,
    maxLenght: 1024,
    required: true,
  },

  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    isAdmin: this.isAdmin,
  };

  const token = jwt.sign(payload, config.get("jwtPrivateKey"));
  return token;
};

export const User = mongoose.model("User", userSchema);

export const validation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(20).required(),
  });

  return schema.validate(user);
};
