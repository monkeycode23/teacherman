import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    classrooms: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    names: [{ type: String, required: true, trim: true }],
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
    code: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Collaborator", TeacherSchema);
