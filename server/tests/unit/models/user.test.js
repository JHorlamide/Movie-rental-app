import { User } from "../../../models/user.js";
import config from "config";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

describe("user.generateAuthToken", () => {
  it("Should return  a valide JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };

    const user = new User(payload);

    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
  });
});
