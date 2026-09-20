import mongoose from "mongoose";
import "./user.js"; // Ensure User schema is registered before populate queries run

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
    },
    coverImage: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    isTopHeadline: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

// Fallback image hook for Mongoose 9
newsSchema.pre("save", function () {
  if (!this.imageUrl && this.coverImage) {
    this.imageUrl = this.coverImage;
  } else if (!this.coverImage && this.imageUrl) {
    this.coverImage = this.imageUrl;
  }
});

const News = mongoose.model("News", newsSchema);

export default News;
