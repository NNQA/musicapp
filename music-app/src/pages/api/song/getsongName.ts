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
        const { text } = req.body;
        const existSong = await prisma.song.findUnique({
          where: {
            title: text as string,
          },
          include: {
            author: true,
          },
        });
        if (!existSong) {
          return res.status(404).json({ message: "Cant not found title song" });
        }
        return res.status(200).json(existSong);
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
