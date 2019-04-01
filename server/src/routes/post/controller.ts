import { RequestHandler } from "express";
import Post from "../../schema/Post";
import Tag from "../../schema/Tag";

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.json({
      payload: posts
    });
  } catch (err) {
    next(err);
  }
};

export const addPost: RequestHandler = async (req, res, next) => {
  try {
    const post = new Post(req.body);
    const tags = req.body.tags.map((tag: string) => {
      tag;
    });
    await Tag.insertMany(tags, { ordered: false });
    const success = await post.save();
    return res.json({
      success: !!success
    });
  } catch (err) {
    next(err);
  }
};
