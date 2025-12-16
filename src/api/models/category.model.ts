import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true 
  },
  description: String,
  color: { type: String, default: "#666666" },
  icon: { type: String, default: "📁" },
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
