import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { Prisma, User } from "@prisma/client";

const MeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method == "GET") {
    const session = await getSession({ req });

    if (session && typeof session.token === "string") {
      const data = await prisma.account.findFirst({
        where: {
          id: session.token,
        },
        include: {
          user: true,
        },
      });

      if (data === null) {
        res.status(404).json({ message: "account not found" });
      } else {
        res.status(200).json(data.user);
      }
    } else {
      res.status(401).json({ message: "session undefined" });
    }
  } else if (req.method == "POST") {
    const session = await getSession({ req });

    if (session && typeof session.token === "string") {
      const user = JSON.parse(req.body) as Prisma.UserCreateInput;

      const data = await prisma.account.create({
        data: {
          id: session.token,
          user: {
            create: user,
          },
        },
      });

      if (data === null) {
        res.status(404).json({ message: "account create failure" });
      } else {
        res.status(200).json(user);
      }
    } else {
      res.status(405);
    }
  } else {
    res.status(405);
  }
};

export default MeHandler;
