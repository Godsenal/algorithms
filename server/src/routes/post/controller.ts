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
    /* escape special chracter like c++ */
    const escaped = search ? search.replace(/[+]/g, "\\$&") : "";
    /* Set Query option */
    const option = {
      ...(search && {
        $or: [
          { title: new RegExp(escaped) },
          { tags: search },
          { mode: search }
        ]
      }),
      ...(offset && {
        _id: { $lt: offset } // _id로 내림차순 정렬하기 때문에 lt로 해줘야 적절한 offset 설정 가능.
      })
    };
    const postQuery = Post.find(option).sort({ _id: -1 });
    /* Set limit option */
    postQuery.limit(parseInt(limit || 10));
    /* Set order option */
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
