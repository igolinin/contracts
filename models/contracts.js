const mongoose = require("mongoose");
const Joi = require("joi");

const contractSchema = new mongoose.Schema({
  client: {
    type: String,
    lowercase: true,
    required: true
  },
  manager: {
    type: String,
    required: true,
    minlength: 8
  },
  service: {
    type: String
  },
  city: {
    type: String
  },
  aproved_by: {
    type: String
  }
});
function validateContract(contract) {
  const schema = {
    email: Joi.string().required()
  };
  return Joi.validate(contract, schema);
}

const Contract = mongoose.model("User", contractSchema);

module.exports = Contract;
exports.validate = validateContract;
