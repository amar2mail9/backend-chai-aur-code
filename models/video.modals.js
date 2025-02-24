import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  videoFile: {
    type: String, // Cloudinary
    required: true,
  },
  thumbnail: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Video = mongoose.model("Video", videoSchema);
