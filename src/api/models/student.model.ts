import mongoose from "mongoose";

const studenSchema = new mongoose.Schema(
  {
    names: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, unique: true },
    phone: { type: String },
    company: { type: String },
    address: { type: String },
    average: { type: Number, default: 0 },
    dni: {
      type: String,
    },
    notes: {
      type: String,
    },
    activities: [
      {
        name: String,
      },
    ],

    
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    code: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studenSchema);
