import Posts from "../models/post.js";

// GET POST BY PAGINATION
export const getPostsByPagination = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 3;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Posts.countDocuments();
    const posts = await Posts.find().limit(LIMIT).skip(startIndex);

    res.json({
      posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
