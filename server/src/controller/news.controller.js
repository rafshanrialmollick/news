import NewsService from "../services/news.Service.js";

export const creatNews = async (req, res, next) => {
  try {
    const news = await NewsService.createNews(req.body, req.user._id);
    res.status(201).json({
      success: true,
      data: news,
      message: "News created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getTop6News = async (req, res, next) => {
  try {
    const top6 = await NewsService.getTop6News();
    res.status(200).json({
      success: true,
      data: top6,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNews = async (req, res, next) => {
  try {
    const news = await NewsService.getAllNews();
    res.status(200).json({
      success: true,
      data: news,
      message: "News fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsById = async (req, res, next) => {
  try {
    const { news, related } = await NewsService.getNewsById(req.params.id);
    res.status(200).json({
      success: true,
      data: news,
      related,
      message: "News fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (req, res, next) => {
  try {
    const news = await NewsService.updateNews(req.params.id, req.body, req.user);
    res.status(200).json({
      success: true,
      data: news,
      message: "News updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (req, res, next) => {
  try {
    await NewsService.deleteNews(req.params.id, req.user);
    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Comment content cannot be empty" });
    }

    const commentData = {
      user: req.user._id,
      userName: req.user.name,
      userAvatar: req.user.avatar,
      content,
      createdAt: new Date(),
    };

    const comments = await NewsService.addComment(req.params.id, commentData);
    res.status(200).json({
      success: true,
      comments,
      message: "Comment added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNewsByfilter = async (req, res, next) => {
  try {
    const result = await NewsService.getNews(req.query);
    res.status(200).json({
      success: true,
      count: result.news.length,
      total: result.total,
      page: result.page,
      totalPages: result.pages,
      pages: result.pages,
      data: result.news,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const categories = await NewsService.findCatagory();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
