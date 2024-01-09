import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    tourName: {
        type: String,
        required: true
      },
    guestSize: {
      type: Number,
      required: true
    },
    phone: {
        type: Number,
        required: true
      },
    bookAt: {
        type: Date,
        required: true
      }
  },
  { timestamps: true }
);

export const BookingModel= mongoose.model("Booking", reviewSchema);
