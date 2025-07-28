import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, enum: ["citizen", "admin"], default: "citizen" },
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dz1qj3x4f/image/upload/v1735681234/default-profile-picture.png",
  },
  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
