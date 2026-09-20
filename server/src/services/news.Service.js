import mongoose from "mongoose";
import NewsRepository from "../repository/newsRepository.js";
import ApiError from "../utils/ApiError.js";
import News from "../model/news.js";
import User from "../model/user.js";

function createSlug(title) {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${cleanTitle}-${randomSuffix}`;
}

const createNews = async (newsInfo, userId) => {
  const slug = newsInfo.slug || createSlug(newsInfo.title);
  const data = {
    ...newsInfo,
    slug,
    author: userId,
    imageUrl: newsInfo.imageUrl || newsInfo.coverImage,
    coverImage: newsInfo.imageUrl || newsInfo.coverImage,
  };

  return await NewsRepository.create(data);
};

const getTop6News = async () => {
  return await NewsRepository.findTop6();
};

const getAllNews = () => NewsRepository.findAll();
const findCatagory = () => NewsRepository.findAllCatagory();

const getNewsById = async (id) => {
  let news = null;

  if (mongoose.Types.ObjectId.isValid(id)) {
    news = await NewsRepository.findById(id);
  }

  if (!news) {
    news = await News.findOne({ slug: id }).populate("author", "name email avatar bio");
  }

  if (!news) throw new ApiError(404, "News article not found");

  // Increment view count
  news.views = (news.views || 0) + 1;
  await news.save();

  const related = await NewsRepository.findRelated(news.category, news._id);

  return { news, related };
};

const updateNews = async (id, data, user) => {
  const existingNews = await News.findById(id);
  if (!existingNews) throw new ApiError(404, "News article not found");

  if (existingNews.author.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Not authorized to update this article");
  }

  if (data.imageUrl && !data.coverImage) data.coverImage = data.imageUrl;
  if (data.coverImage && !data.imageUrl) data.imageUrl = data.coverImage;

  const news = await NewsRepository.updateById(id, data);
  return news;
};

const deleteNews = async (id, user) => {
  const existingNews = await News.findById(id);
  if (!existingNews) throw new ApiError(404, "News article not found");

  if (existingNews.author.toString() !== user._id.toString() && user.role !== "admin") {
    throw new ApiError(403, "Not authorized to delete this article");
  }

  await NewsRepository.deleteById(id);
  return true;
};

const addComment = async (id, commentData) => {
  const news = await News.findById(id);
  if (!news) throw new ApiError(404, "News article not found");

  news.comments.push(commentData);
  await news.save();

  return news.comments;
};

function buildNewsFilter(query) {
  const filter = {};

  if (query.category && query.category !== "All") {
    filter.category = query.category;
  }

  if (query.status) {
    filter.status = query.status;
  }

  if (query.author) {
    filter.author = query.author;
  }

  if (query.search && query.search.trim() !== "") {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { content: { $regex: query.search, $options: "i" } },
      { summary: { $regex: query.search, $options: "i" } },
    ];
  }

  return filter;
}

async function getNews(query) {
  const filter = buildNewsFilter(query);

  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 100);
  const skip = (page - 1) * limit;

  let sort = "-createdAt";
  if (query.sort === "popular") {
    sort = "-views -createdAt";
  } else if (query.sort === "oldest") {
    sort = "createdAt";
  } else if (query.sort) {
    sort = query.sort.split(",").join(" ");
  }

  const [total, news] = await Promise.all([
    NewsRepository.countNews(filter),
    NewsRepository.findNews(filter, { sort, skip, limit }),
  ]);

  return {
    page,
    limit,
    total,
    news,
    pages: Math.ceil(total / limit) || 1,
  };
}

export default {
  createNews,
  getTop6News,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
  addComment,
  getNews,
  findCatagory,
};
