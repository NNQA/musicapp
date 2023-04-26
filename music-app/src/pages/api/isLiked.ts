import { prisma } from "@/server/prisma";

export default async function isLiked(req: any, res: any) {
  if (req.method === "GET") {
    const data = await prisma.like.findMany();
    console.log(data);
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const { ids, idu } = req.body;
    console.log(req.body);
    const data = await prisma.like.create({
      data: {
        songId: ids,
        userId: idu,
      },
    });
    return res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const { ids, idu } = req.query;
    console.log(ids +" " + idu)
    const data = await prisma.like.deleteMany({
      where: {
        songId: ids,
        userId: idu,
      },
    });
    return res.status(200).json(data);
  } else {
    res.status(400).json({ message: "Invalid method" });
  }
}
