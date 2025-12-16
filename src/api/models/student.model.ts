import mongoose from "mongoose";

const studenSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  company: { type: String },
  address: { type: String },

  contactPerson: {
    name: String,
    email: String,
    phone: String
  },

  notes: { type: String }, // notas internas sobre el cliente

  /* projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
  ], */

}, { timestamps: true });

export default mongoose.model("Student", studenSchema);
