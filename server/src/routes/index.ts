import express, { ErrorRequestHandler } from "express";
import postRoute from "./post";
import tagRoute from "./tag";

const router = express.Router();

// Temp
const errorLog: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(503).json({
    error: err.message
  });
};

router.use("/post", postRoute);
router.use("/tag", tagRoute);

router.use(errorLog);
export default router;
