import type { NextApiRequest, NextApiResponse } from "next";

const PostsHandler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method == "GET") {
    res.status(200).json({});
  } else if (req.method == "POST") {
    console.log(req.body);
    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
};

export default PostsHandler;
