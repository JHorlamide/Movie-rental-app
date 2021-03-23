import { User, validation } from "../models/user.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import asyncMiddleware from "../middleware/async.js";

export const getCurrentUsers = asyncMiddleware(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).select("-password");
  res.send(user);
});

export const createUser = asyncMiddleware(async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = validation({ name, email, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //Check if user already exit
  let user = await User.findOne({ email: email });

  if (user) {
    return res.status(400).json({ message: "User already registered." });
  }

  user = new User({
    name,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});
