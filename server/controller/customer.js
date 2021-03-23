import Customer from "../models/customers.js";
import { validation } from "../models/customers.js";
import asyncMiddleware from "../middleware/async.js";

/* GET: all customer */
export const getAllCustomers = asyncMiddleware(async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

/* GET: single customer */
export const getSingleCustomer = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const customers = await Customer.findById(id);

  if (!customers) {
    return res
      .status(404)
      .json({ msg: "There is no customer with the given Id" });
  }

  res.send(customers);
});

/* POST: Creat new customer */
export const createNewCustomer = asyncMiddleware(async (req, res) => {
  const { name, phone, isGold } = req.body;

  const { error, value } = validation({ name, phone, isGold });

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const customer = new Customer(value);

  await customer.save();

  res.send(customer);
});

/* PUT: Update customer */
export const updateCustomer = async (req, res) => {};

/* DELETE: Delete customer */
export const deleteCustomer = async (req, res) => {};
