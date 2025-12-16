import mongoose from "mongoose";

const resourcesSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["file", "image", "video", "link"],
      default: "file",
    },
    title: {
      type: String,
      required: true,

      trim: true,
    },
    url: {
      type: String,
      required: true,

      trim: true,
      lowercase: true,
    },
    thumbnail: {
      type: String,

      trim: true,
    },
    uploadedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourcesSchema);
