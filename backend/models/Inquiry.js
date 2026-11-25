import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    inquiryId: {
      type: String,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    phone: {
      type: String,
      default: ""
    },

    eventType: {
      type: String,
      default: ""
    },

    eventDate: {
      type: String,
      default: ""
    },

    message: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "New"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Inquiry",
  inquirySchema
);