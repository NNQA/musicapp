import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import PersistentFile from "formidable/PersistentFile";
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
          // console.log(file.name)
          console.log(field.name);

          console.log("adsad");
          if (typeof file.name as unknown as string) {
            const existSong = await prisma.song.findUnique({
              where: {
                title: field.name as string,
              },
            });
            console.log(existSong);
            if (existSong) {
              return res.status(401).json({ message: "Song name existed" });
            }
          }
          console.log(file.image);
          if (!file.image || !file.audio) {
            console.log("adsadad");
            return res
              .status(400)
              .json({
                message:
                  "Image File and audio file have trouble or dont have exist",
              });
          }

          const imageUrlPromise = cloudinary.uploader
            .upload((file.image as any).filepath)
            .then((v) => v.secure_url)
            .catch((e) => {
              console.log(e);
              return "";
            });
          cloudinary.uploader.upload;
          const audioUrlPromise = cloudinary.uploader
            .upload((file.audio as any).filepath, {
              resource_type: "auto",
            })
            .then((v) => v.secure_url)
            .catch((e) => {
              console.log(e);
              return "";
            });

          const [imageUrl, audioUrl] = await Promise.all([
            imageUrlPromise,
            audioUrlPromise,
          ]);
          console.log(imageUrl, audioUrl);
          const song = await prisma.song.create({
            data: {
              title: field.name as string,
              description: field.descript as string,
              author: {
                connect: {
                  id: field?.uId as string,
                  email: field.email as string,
                },
              },
              image: imageUrl,
              audio: audioUrl,
              date: new Date(),
            },
            include: {
              author: true,
            },
          });
          return res.status(200).json(song);
        });
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }

      break;

    case "GET":
      try {
        const allSongs = await prisma.song.findMany({
          include: {
            author:true,
          }
        });
        return res.status(200).json(allSongs);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
      break;

    case "PUT":
      break;

    case "DELETE":
      break;

    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}

async function createSong(
  id: string,
  title: string,
  des: string,
  a: string,
  b: string
): Promise<{ message?: string; error?: boolean } | any> {
  const existSong = await prisma.song.findUnique({
    where: {
      title,
    },
  });
  if (existSong) {
    return { error: true, message: "Email already exists" };
  }
  const song = await prisma.song.create({
    data: {
      title: title,
      description: des,
      authorId: id,
      image: a,
      audio: b,
      date: new Date(),
    },
  });
  return song;
}

export async function findSongExist(title: string) {
  const existSong = await prisma.song.findUnique({
    where: {
      title,
    },
  });
  if (existSong) {
    return { error: true, message: "Email already exists" };
  }
}
