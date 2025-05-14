// server/models/event.model.js

const mongoose = require("mongoose");
const Joi = require("joi");

// 1) Mongoose Schema & Model
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],    
      default: [],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

// 2) Joi Validation for request bodies
function validateEvent(event) {
  const schema = Joi.object({
    name: Joi.string().max(200).required(),
    description: Joi.string().required(),
    category: Joi.string().required(), 
    date: Joi.date().required(),
    venue: Joi.string().max(200).required(),
    price: Joi.number().min(0).required(),
    images: Joi.array().items(Joi.string().uri()).optional(),
  });
  return schema.validate(event);
}

module.exports = { Event, validateEvent };
