import bcrypt from "bcryptjs";
import User from "../model/user.js";
import News from "../model/news.js";
import ApiError from "../utils/ApiError.js";

export const getDashboard = async (req, res, next) => {
  try {
    const userNews = await News.find({ author: req.user._id }).sort({ createdAt: -1 });

    const totalArticles = userNews.length;
    const totalViews = userNews.reduce((acc, item) => acc + (item.views || 0), 0);

    res.status(200).json({
      success: true,
      news: userNews,
      stats: {
        totalArticles,
        totalViews,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, avatar, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;

    if (password && password.trim().length > 0) {
      if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
      },
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
