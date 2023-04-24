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
        const existSong = await prisma.song.findMany({
          where: {
            authorId: id
          },
        });
       console.log(existSong)
        res.status(200).json(existSong);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }

      break;

    case "GET":
      break;

    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}
