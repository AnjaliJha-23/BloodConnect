const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    patientAge: {
      type: Number,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    units: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    // Restored after merge
    status: {
      type: String,
      enum: ["Open", "Completed"],
      default: "Open",
    },

    // Restored after merge
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    responses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Request", RequestSchema);