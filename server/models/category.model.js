// models/category.model.js
const mongoose = require("mongoose");
const Joi     = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
  },
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

function validateCategory(cat) {
  const schema = Joi.object({
    name: Joi.string().trim().max(100).required(),
  });
  return schema.validate(cat);
}

module.exports = { Category, validateCategory };
