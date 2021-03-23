import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export const validation = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = validation({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    /* Check if user exists */
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    /* Validate user password */
    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!passwordValidation) {
      return res.status(400).json({ message: "Invalid Password." });
    }

    const token = user.generateAuthToken();
    res.json({token});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
