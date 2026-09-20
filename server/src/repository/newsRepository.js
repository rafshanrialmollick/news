import News from "../model/news.js";

const create = (newsInfo) => News.create(newsInfo);

const findAll = () => News.find().populate("author", "name email avatar bio");

const findAllCatagory = () => News.distinct("category");

const findById = (id) => News.findById(id).populate("author", "name email avatar bio");

const updateById = (id, data) =>
  News.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("author", "name email avatar bio");

const deleteById = (id) => News.findByIdAndDelete(id);

const countNews = async (filter) => {
  return await News.countDocuments(filter);
};

const findNews = async (filter, options = {}) => {
  const { sort = "-createdAt", skip = 0, limit = 12, fields = "" } = options;

  const query = News.find(filter)
    .populate("author", "name email avatar bio")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  if (fields) {
    query.select(fields);
  }

  return await query;
};

const findTop6 = async () => {
  // First attempt to find top headlines, otherwise fallback to top views / recent
  let top6 = await News.find({ isTopHeadline: true })
    .populate("author", "name email avatar bio")
    .sort("-createdAt")
    .limit(6);

  if (top6.length < 6) {
    const additional = await News.find({ _id: { $nin: top6.map((n) => n._id) } })
      .populate("author", "name email avatar bio")
      .sort("-views -createdAt")
      .limit(6 - top6.length);

    top6 = [...top6, ...additional];
  }

  return top6;
};

const findRelated = async (category, currentId) => {
  return await News.find({ category, _id: { $ne: currentId } })
    .populate("author", "name email avatar bio")
    .sort("-createdAt")
    .limit(3);
};

export default {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
  findNews,
  countNews,
  findAllCatagory,
  findTop6,
  findRelated,
};
