import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getQueryAsString } from "@/utils/query";

const BookmarkHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method == "POST") {
    const data = await prisma.bookmark.create({
      data: {
        postId: getQueryAsString(req.query.postId),
        userId: "hoge",
      },
    });
    res.status(200).json({ ok: true, data });
  } else if (req.method == "DELETE") {
    const id = await prisma.bookmark.findFirst({
      where: {
        postId: getQueryAsString(req.query.postId),
        userId: "hoge",
      },
    });
    const data = await prisma.bookmark.delete({
      where: {
        id: id?.id,
      },
    });
    res.status(200).json({ ok: true, data });
  } else {
    res.status(405).json({});
  }
};

export default BookmarkHandler;
