import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../model/user.js";
import News from "../model/news.js";

const MONGO_URI = process.env.MONGO_URI;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchRealNews() {
  const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=100&apiKey=${NEWS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error(`NewsAPI error: ${data.message}`);
  }

  return data.articles;
}

async function seedNews() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully.");

    // Clear old data
    await User.deleteMany({});
    await News.deleteMany({});

    // Create Demo User (same as your static version)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const demoUser = await User.create({
      name: "Eleanor Vance",
      email: "eleanor@newsportal.com",
      password: hashedPassword,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      bio: "Senior Chief Editor & Global Investigative Journalist covering emerging technology, planetary science, and macroeconomic policy.",
      role: "admin",
    });

    console.log(`Demo User created: ${demoUser.email} (Password: password123)`);

  
    const articles = await fetchRealNews();

    const newsDocs = articles
      .filter((a) => a.title && a.content) 
      .map((a, index) => {
        const cleanSlug = a.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        const randomId = Math.random().toString(36).substring(2, 7);

        return {
          title: a.title,
          slug: `${cleanSlug}-${randomId}`,
          summary: a.description || "",
          content: a.content,
          category: "General",
          coverImage: a.urlToImage || "",
          isTopHeadline: index < 5, 
          views: Math.floor(Math.random() * 5000),
          tags: [], 
          author: demoUser._id, 
          status: "published",
          publishedAt: a.publishedAt ? new Date(a.publishedAt) : new Date(),
          comments: [
            {
              user: demoUser._id,
              userName: "Dr. Aris Thorne",
              userAvatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
              content:
                "Insightful analysis! The implications of this development cannot be overstated.",
              createdAt: new Date(Date.now() - 3600000 * 2),
            },
          ],
        };
      });

    const insertedNews = await News.insertMany(newsDocs);
    console.log(
      `Successfully seeded ${insertedNews.length} real news articles.`,
    );

    await mongoose.disconnect();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedNews();
