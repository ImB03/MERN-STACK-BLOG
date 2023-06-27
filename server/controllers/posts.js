import Posts from "../models/post.js";

//GET ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET ONE POST
export const getOnePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Posts.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//CREATE A POST
export const createPost = async (req, res) => {
  const infoCreatePost = req.body;

  const newPost = new Posts({ ...infoCreatePost, creator: req.userId });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//UPDATE A POST
export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const infoUpdatePost = req.body;

  try {
    const updatedPost = await Posts.findByIdAndUpdate(postId, infoUpdatePost, {
      new: true,
    });

    console.log(updatedPost);

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

// DELETE A POST
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Posts.findByIdAndRemove(postId);
    res.json(deletedPost);
  } catch (error) {
    console.log(error);
  }
};

//LIKE POST
export const likePost = async (req, res) => {
  const { postId } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  try {
    const post = await Posts.findById(postId);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId); //like post
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId)); //dislike post
    }

    const updatedPost = await Posts.findByIdAndUpdate(postId, post, {
      new: true,
    });

    console.log(updatedPost);

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = async (req, res) => {
  console.log(req);
  console.log(req.body);
  const { postId } = req.params;
  console.log(postId);

  const { dataComment } = req.body;
  console.log(dataComment);

  try {
    const post = await Posts.findById(postId);

    post.comments.push(dataComment);

    console.log(post);

    const updatedPost = await Posts.findByIdAndUpdate(postId, post, {
      new: true,
    });

    console.log(updatedPost);

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
