import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

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
        res.status(200).json({ user: data.user });
      }
    } else {
      res.status(200).json({ ok: false });
    }
  } else if (req.method == "POST") {
    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
};

export default MeHandler;
