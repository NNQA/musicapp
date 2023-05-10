import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const { id } = req.body;
        const user = await prisma.user.findUnique({
          where: {
            id: id as string,
          },
        });
        return res.status(200).json(user);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }

      break;

    case "GET":
      break;

    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}
