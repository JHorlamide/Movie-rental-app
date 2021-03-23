import express from "express";
import {auth} from '../middleware/auth.js';
import validateObjectId from "../middleware/validateObjectId.js";
import {
  getAllCustomers,
  getSingleCustomer,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customer.js";

const router = express.Router();

/***
 * @route   GET /api/customer
 * @desc    Get all customer
 * @access  Public
 *  ***/
router.get("/", getAllCustomers);

/***
 * @route   GET /api/customer
 * @desc    Get single customer
 * @access  Public
 *  ***/
router.get("/:id", validateObjectId, getSingleCustomer);

/***
 * @route   POST /api/customer
 * @desc    Create new customer
 * @access  Public
 *  ***/
router.post("/", auth, createNewCustomer);

/***
 * @route   PUT /api/customer
 * @desc    Update customer
 * @access  Public
 *  ***/
router.put("/:id", auth, updateCustomer);

/***
 * @route   DELETE /api/customer
 * @desc    Delete customer
 * @access  Public
 *  ***/
router.delete("/:id", auth, deleteCustomer);

export default router;
