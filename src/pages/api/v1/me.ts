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

      res.status(200).json({ ok: true, data: data?.user });
    } else {
      res.status(200).json({ ok: false });
    }
  } else {
    res.status(405).json({});
  }
};

export default MeHandler;
