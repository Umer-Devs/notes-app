import mongoose from "mongoose";

const userNotes = new mongoose.Schema(
  {
    val: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Signup", 
      required: true, 
    },
  },
  { timestamps: true }
);

export const Notes = mongoose.model("Notes", userNotes);
