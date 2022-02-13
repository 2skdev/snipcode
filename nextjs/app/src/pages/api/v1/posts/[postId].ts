import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getQueryAsString } from "@/utils/query";

const PostsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method == "GET") {
    const data = await prisma.post.findUnique({
      where: {
        id: getQueryAsString(req.query.postId),
      },
    });
    res.status(200).json(data);
  } else if (req.method == "PUT") {
    const data = await prisma.post.update({
      where: {
        id: getQueryAsString(req.query.postId),
      },
      data: {
        title: req.body.title,
        language: req.body.language,
        code: req.body.code,
        description: req.body.description,
      },
    });
    res.status(200).json({ ok: true, data });
  } else if (req.method == "DELETE") {
    const data = await prisma.post.delete({
      where: {
        id: getQueryAsString(req.query.postId),
      },
    });
    res.status(200).json({ ok: true, data });
  } else {
    res.status(405).json({});
  }
};

export default PostsHandler;
