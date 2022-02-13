import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { getQueryAsString, getQueryAsNumber } from "@/utils/query";
import { CreatePostRequest } from "@/types/request";

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
    const session = await getSession({ req });

    if (session && typeof session.token === "string") {
      let input = JSON.parse(req.body) as CreatePostRequest;

      const account = await prisma.account.findUnique({
        where: {
          id: session.token,
        },
      });

      if (account) {
        const data = await prisma.post.create({
          data: {
            id: random(16),
            userId: account.userId,
            title: input.title,
            language: input.language,
            code: input.code,
            description: input.description,
          },
        });

        res.status(200).json(data);
      } else {
        res.status(401).json({ message: "Account is not registerd" });
      }
    } else {
      res.status(401).json({ message: "Token is not exist" });
    }
  } else {
    res.status(405).json({});
  }
};

export default PostsHandler;
