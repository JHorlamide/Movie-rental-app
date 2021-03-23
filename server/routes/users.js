import express from "express";
import { createUser, getCurrentUsers } from "../controller/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

/***
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public
 *  ***/
router.get("/me", auth, getCurrentUsers);

/***
 * @route   GET /api/users
 * @desc    Register user
 * @access  Public
 *  ***/
router.post("/", createUser);

export default router;
