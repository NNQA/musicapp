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
        const { pId } = req.body;
        const existPlaylist = await prisma.playlist.findUnique({
          where: {
            title: pId as string,
          },
          include: {
            user: true,
          },
        });
        console.log(existPlaylist);
        res.status(200).json(existPlaylist);
      } catch (error: any) {
        res
          .status(400)
          .json({ message: "Somethings is wrong, please reloading page" });
      }

      break;

    case "GET":
      break;

    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}
