import type { NextApiRequest, NextApiResponse } from "next";

const MeHandler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method == "GET") {
    res.status(200).json({ userid: "tmp" });
  } else {
    res.status(405).json({});
  }
};

export default MeHandler;
