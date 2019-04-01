import Tag from "../../schema/Tag";
import { RequestHandler } from "express";

export const getTags: RequestHandler = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    return res.json({
      payload: tags
    });
  } catch (err) {
    next(err);
  }
};
