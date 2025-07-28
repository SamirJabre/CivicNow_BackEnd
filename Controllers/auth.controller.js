import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (![email, password].every(Boolean)) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    !user && (() => res.status(401).json({ error: "Email not found" }))();

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    !passwordMatch &&
      (() => res.status(401).json({ error: "Password Incorrect" }))();

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Login successful",
      token: { token, expiresIn: "1m" },
      user,
      decoded: { user_id: decoded.user_id, expiry: decoded.exp },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (![name, email, password, phone, address].every(Boolean))
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({
        message: "User with this email already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      hashedPassword,
      phone,
      address: {
        state: address.state,
        city: address.city,
        street: address.street,
      },
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
