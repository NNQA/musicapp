import { prisma } from "@/server/prisma";
import { connect } from "http2";


export default async function isCmt(req: any, res: any) {
  if (req.method === "GET") {
    const {sId} = req.query
    const data = await prisma.comment.findMany({
      where: {
        songId: sId,
      },
      include: {
        user: true,
      }
    });
    console.log(data);
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const {sId, uId, textcmt } = req.body
    console.log(req.body);
    const data = await prisma.comment.create({
      data: {
        text: textcmt,
        user: {
          connect: {
            id: uId,
          }
        },
        song: {
          connect: {
            id: sId,
          }
        }
      },
      include: {
        user: true,
        song:true,
      }
    });
    return res.status(200).json(data);
  } else if (req.method === 'DELETE') {
    const {cmtId} = req.query;
    console.log(cmtId)
    const data = await prisma.comment.delete({
      where: {
        id: cmtId,
      }
    });
    return res.status(200).json("ok");
  }
  else {
    res.status(400).json({ message: "Invalid method" });
  }
}
