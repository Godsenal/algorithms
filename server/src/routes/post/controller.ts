import { RequestHandler } from "express";
import Post from "../../schema/Post";
import Tag from "../../schema/Tag";

export const getPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.findById(req.query.postId);
    return res.json({
      payload: post
    });
  } catch (err) {
    next(err);
  }
};
export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const { limit, offset, search } = req.query;
    /* Set Query option */
    const option = {
      ...(search && {
        $or: [{ title: new RegExp(search) }, { tags: search }, { mode: search }]
      }),
      ...(offset && {
        _id: { $gt: offset }
      })
    };
    const postQuery = Post.find(option);
    /* Set limit option */
    postQuery.limit(parseInt(limit || 10));
    const posts = await postQuery.exec();
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
    const tags = req.body.tags.map((tag: string) => ({
      name: tag
    }));
    try {
      await Tag.insertMany(tags, { ordered: false });
    } catch (err) {
      console.error(err);
    }
    const success = await post.save();
    return res.json({
      payload: !!success
    });
  } catch (err) {
    next(err);
  }
};
