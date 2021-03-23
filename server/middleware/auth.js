import config from "config";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Invalid token" });
  }
};
