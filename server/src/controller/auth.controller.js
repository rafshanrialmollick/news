import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import ApiError from "../utils/ApiError.js";

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "fallback_secret";
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, avatar, bio } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "Please provide name, email, and password");
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new ApiError(400, "An account with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      avatar: avatar || undefined,
      bio: bio || undefined,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
      },
      message: "Registration successful",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Please provide email and password");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
      },
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
