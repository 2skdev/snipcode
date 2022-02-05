import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getQueryAsNumber } from "@/utils/query";

const CommentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method == "PUT") {
    const data = await prisma.comment.update({
      where: {
        id: getQueryAsNumber(req.query.commentId),
      },
      data: {
        comment: req.body.comment,
      },
    });
    res.status(200).json({ ok: true, data });
  } else if (req.method == "DELETE") {
    const data = await prisma.like.delete({
      where: {
        id: getQueryAsNumber(req.query.commentId),
      },
    });
    res.status(200).json({ ok: true, data });
  } else {
    res.status(405).json({});
  }
};

export default CommentHandler;
