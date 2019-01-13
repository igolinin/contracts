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
    lowercase: true,
    required: true
  },
  service: {
    type: String
  },
  country: {
    type: String
  },
  expires: {
    type: Date,
    default: () => {
      return expireDate();
    }
  },
  approved_by: {
    type: String
  },
  total: {
    type: Number
  }
});
function expireDate() {
  let date = new Date();
  date.setFullYear(date.getFullYear + 1);
  return date;
}
function validateContract(contract) {
  const schema = {
    client: Joi.string().required()
  };
  return Joi.validate(contract, schema);
}

const Contract = mongoose.model("User", contractSchema);

module.exports = Contract;
exports.validate = validateContract;
