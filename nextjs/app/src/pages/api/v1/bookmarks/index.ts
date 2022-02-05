import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getQueryAsString, getQueryAsNumber } from "@/utils/query";

const BookmarkHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method == "GET") {
    const data = await prisma.bookmark.findMany({
      where: {
        userId: getQueryAsString(req.query.userId),
        postId: getQueryAsString(req.query.postId),
      },
      skip: getQueryAsNumber(req.query.offset),
      take: 10,
    });
    res.status(200).json({ ok: true, data });
  } else {
    res.status(405).json({});
  }
};

export default BookmarkHandler;
