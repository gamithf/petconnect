import PetPost from '../models/PetPost.mjs';
import User from '../models/User.mjs';
import { upload, uploadBufferToCloudinary } from "../lib/upload.js";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;
    const q = {};
    if (type) {
      q.type = type;
    }

    const posts = await PetPost.find(q)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .populate("postedBy", "name email");

    const total = await PetPost.countDocuments(q);
    res.json({ data: posts, total, page: +page, limit: +limit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new post
export const imgPost = async (req, res) => {
  try {
    const { type, imageUrl, description, details, postedBy } = req.body;
    const post = await PetPost.create({ type, imageUrl, description, details, postedBy });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { type, description, details, location } = req.body;
    console.log("Creating post with data:", { type, description, details, location });
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const cloud = await uploadBufferToCloudinary(req.file.buffer, "petconnect/posts");
    const post = await PetPost.create({
      type,
      description,
      details,
      location,
      imageUrl: cloud.secure_url,
      postedBy: req.user.id,
    });

    const populated = await post.populate("postedBy", "name email");
    res.status(201).json(populated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Get a single post
export const getPost = async (req, res) => {
  try {
    const post = await PetPost.findById(req.user.id).populate('postedBy', 'name email');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    await PetPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await PetPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike the post
      post.likes.pull(userId);
    } else {
      // Like the post
      post.likes.push(userId);
    }
    await post.save();
    res.json({ likes: post.likes });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// New function to add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Comment text is required" });

    const post = await PetPost.findById(req.user.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const comment = {
      user: user.name,
      text,
    };
    post.comments.push(comment);
    await post.save();
    
    const newComment = post.comments[post.comments.length - 1];
    await post.populate('comments.user', 'name');
    
    res.status(201).json(post.comments);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};