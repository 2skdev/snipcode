import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { getQueryAsString, getQueryAsNumber } from "@/utils/query";

const random = (length: number): string => {
  const rand = crypto.randomBytes(length >> 1).toString("hex");
  return rand;
};

const PostsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method == "GET") {
    const data = await prisma.post.findMany({
      where: {
        userId: getQueryAsString(req.query.userId),
        language: getQueryAsString(req.query.language),
      },
      skip: getQueryAsNumber(req.query.offset),
      take: 10,
    });
    res.status(200).json({ ok: true, data });
  } else if (req.method == "POST") {
    const data = await prisma.post.create({
      data: {
        id: random(16),
        userId: "hoge",
        title: req.body.title,
        language: req.body.language,
        code: req.body.code,
        description: req.body.description,
      },
    });
    res.status(200).json({ ok: true, data });
  } else {
    res.status(405).json({});
  }
};

export default PostsHandler;
