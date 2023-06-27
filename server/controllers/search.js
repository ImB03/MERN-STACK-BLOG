import Posts from "../models/post.js";

// GET POST BY SEARCH
export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  console.log(searchQuery);

  try {
    const title = new RegExp(searchQuery, "i");

    console.log(title);

    const posts = await Posts.find({
      $or: [
        { title: title },
        { description: title },
        { creator: title },
        { name: title },
        { tags: title },
      ],
    });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
  }
};

// GET POST BY CREATOR
export const getPostsByCreator = async (req, res) => {};
