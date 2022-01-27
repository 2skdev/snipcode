import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const random = (length: number): string => {
  const rand = crypto.randomBytes(length >> 1).toString("hex");
  return rand;
};

const PostsHandler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method == "GET") {
    res.status(200).json({});
  } else if (req.method == "POST") {
    const postId = random(16);
    console.log(postId);
    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
};

export default PostsHandler;
