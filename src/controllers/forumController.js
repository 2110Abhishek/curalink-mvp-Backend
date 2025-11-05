import Forum from "../models/Forum.js";

export const createPost = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const post = await Forum.create({ userId, title, content });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Forum.findAll({ order: [["createdAt", "DESC"]] });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
