import express from "express";
import { getAllRentals, creatNewRental } from "../controller/rental.js";
import {auth} from '../middleware/auth.js';

const router = express.Router();

/***
 * @route   GET /api/rentals
 * @desc    Get all rentals
 * @access  Public
 *  ***/
router.get("/", getAllRentals);

/***
 * @route   POST /api/rentals
 * @desc    Create new rental
 * @access  Public
 *  ***/
router.post("/", auth, creatNewRental);

export default router;
