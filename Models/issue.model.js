import mongoose, { Schema } from "mongoose";

const issueSchema = new Schema({
  category: {
    type: String,
    enum: ["pothole", "trash", "lighting", "water", "other"],
    required: true,
  },
  type: {
    type: String,
    required: function () {
      return this.category === "other";
    },
  },
  details: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "in_progress", "resolved", "closed"],
    default: "open",
  },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },
  upvotes: { type: Number, default: 0 },
  image: { type: String },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: { type: Number, default: 0 },   
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", issueSchema, "issues");

export default Issue;
