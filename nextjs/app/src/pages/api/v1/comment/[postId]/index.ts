import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getQueryAsString, getQueryAsNumber } from "@/utils/query";

const CommentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method == "POST") {
    const data = await prisma.comment.create({
      data: {
        postId: getQueryAsString(req.query.postId),
        userId: "hoge",
        comment: req.body.comment,
      },
    });
    res.status(200).json({ ok: true, data });
  } else {
    res.status(405).json({});
  }
};

export default CommentHandler;
