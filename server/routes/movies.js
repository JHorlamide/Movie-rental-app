import express from "express";
import { getAllMovies, createMovie } from "../controller/movie.js";
import {auth} from '../middleware/auth.js';

const router = express.Router();
/***
 * @route   GET /api/movies
 * @desc    Get all genre
 * @access  Public
 *  ***/
router.get("/", getAllMovies);

/***
 * @route   POST /api/movies
 * @desc    Create new movie
 * @access  Public
 *  ***/
router.post('/', auth, createMovie);

export default router;
