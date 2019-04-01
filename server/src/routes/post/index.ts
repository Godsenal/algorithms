import express from "express";
import * as controller from "./controller";

const router = express.Router();

router.get("/", controller.getPosts);
router.post("/", controller.addPost);

export default router;
