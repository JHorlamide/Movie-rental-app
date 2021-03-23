import mongoose from "mongoose";
import Joi from "joi";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 6,
    maxLength: 30,
    required: true,
  },

  isGold: {
    type: Boolean,
    default: false,
  },

  phone: {
    type: String,
    required: function () {
      return this.isGold;
    },
  },
});

export const validation = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
    phone: Joi.string().min(6).max(12).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
};

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
