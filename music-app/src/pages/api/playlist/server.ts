import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import PersistentFile from "formidable/PersistentFile";
import { useId } from "react";
import { isObjectBindingPattern } from "typescript";
cloudinary.config({
  cloud_name: "dgmss9oy4",
  api_key: "471463573585662",
  api_secret: "m8A6vv5mTqg7bBW-uY-E0S3gYy0",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        // console.log(req.);
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, field, file) => {
          // console.log(error);
          console.log(field);
          console.log(file);
          console.log(field.name);

          prisma.playlist
            .findUnique({
              where: {
                title: field.name as string,
              },
            })
            .then()
            .catch((e) => {
              return res.status(401).json({ message: "Playlist name exists" });
            });

          console.log(file.file);
          if (!file.file) {
            console.log("adsadad");
            return res.status(400).json({
              message:
                "Image File and audio file have trouble or dont have exist",
            });
          }

          const imageUrlPromise = cloudinary.uploader
            .upload((file.file as any).filepath)
            .then((v) => v.secure_url)
            .catch((e) => {
              console.log(e);
              return "";
            });

          const [imageUrl] = await Promise.all([imageUrlPromise]);
          console.log(imageUrl);
          console.log(field.id);
          const playist = await prisma.playlist.create({
            data: {
              title: field.name as string,
              img: imageUrl,
              user: {
                connect: {
                  id: field.id as string,
                },
              },
            },
          });
          return res.status(200).json("ok");
        });
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }

      break;
    case "GET":
      // try {
      const { id } = req.query;
      console.log(id);
      const getall = await prisma.playlist.findMany({
        where: {
          userId: id as any,
        },
        include: {
          user: true,
        },
      });
      console.log(getall);
      return res.status(200).json(getall);
      // } catch (error: any) {
      //   res.status(400).json({ message: error.message });
      // }
      break;
    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}
