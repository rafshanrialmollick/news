import jwt from "jsonwebtoken";
import User from "../model/user.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Not authorized to access this route. Token missing.");
    }

    const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(401, "User belonging to this token no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Invalid or expired token"));
    }
    next(error);
  }
};
