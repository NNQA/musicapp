import { prisma } from "@/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { sId, pId } = req.body;
    try {
      const exit = await prisma.playlist_Song.findMany({
        where: {
          songId: sId,
          playlistId: pId,
        },
      });
      if (exit.length !== 0) {
        return res
          .status(401)
          .json({ message: "This song is exit in playlist" });
      }
      const addToplaylist = await prisma.playlist_Song.create({
        data: {
          song: {
            connect: {
              id: sId,
            },
          },
          playlist: {
            connect: {
              id: pId,
            },
          },
        },
      });
      return res.status(200).json(addToplaylist);
    } catch (e) {
      return res.status(401).json({ message: "Cannot add to playlist" });
    }
  } else if (req.method === "GET") {
    try {
      const { id } = req.query;
      console.log(id);
      console.log("asdsad");
      const getall = await prisma.playlist_Song.findMany({
        where: {
          playlistId: id as string,
        },
        include: {
          song: {
            include: {
              author: true,
            },
          },
          playlist: true,
        },
      });
      return res.status(200).json(getall);
    } catch (e) {
      return res.status(401).json({ message: "Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deleteSong = await prisma.playlist_Song.delete({
        where: {
          id: id as string,
        },
      });
      return res.status(200).json(deleteSong);
    } catch (e) {
      return res.status(401).json({ message: "Error" });
    }
  } else {
    return res.status(400).json({ message: "Method not allowed" });
  }
}
