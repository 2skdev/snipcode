import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getQueryAsString } from "@/utils/query";

const UserHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method == "GET") {
    const data = await prisma.post.findFirst({
      where: {
        id: getQueryAsString(req.query.userId),
      },
    });
    res.status(200).json({ ok: true, data });
  } else {
    res.status(405).json({});
  }
};

export default UserHandler;
