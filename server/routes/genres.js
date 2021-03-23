import express from "express";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import validateObjectId from "../middleware/validateObjectId.js";
// import validateObjectId from "../middleware/validateObject"
import {
  getAllGenres,
  getSingleGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controller/genres.js";

const router = express.Router();

/***
 * @route   GET /api/genres
 * @desc    Get all genres
 * @access  Public
 *  ***/
router.get("/", getAllGenres);

/***
 * @route   GET /api/genres
 * @desc    Get single genres
 * @access  Public
 *  ***/
router.get("/:id", validateObjectId, getSingleGenres);

/***
 * @route   GET /api/genres
 * @desc    Create new genres
 * @access  Public
 *  ***/
router.post("/", auth, createGenre);

/***
 * @route   GET /api/genres
 * @desc    Update genres
 * @access  Public
 *  ***/
router.put("/:id", auth, updateGenre);

/***
 * @route   GET /api/genres
 * @desc    remove genres
 * @access  Public
 *  ***/
router.delete("/:id", [auth, admin], deleteGenre);

export default router;
