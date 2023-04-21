import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma";
import formidable from "formidable";
import cloudinary from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { IncomingForm } from "formidable";
cloudinary.v2.config({
  cloud_name: "dgmss9oy4",
  api_key: "471463573585662",
  api_secret: "m8A6vv5mTqg7bBW-uY-E0S3gYy0",
});

export const config = {
  api: {
    bodyParser: true,
  },
};
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === "POST") {
      console.log(req.body);
      // const existUser = await prisma.user.findUnique({
      //   where: {
      //     email: email,
      //   },
      // });
      // if (existUser) {
      //   return res.status(422).json({ error: "Email taken" });
      // }

      // const hashedPassword = await bcrypt.hash(password, 12);
      // if (password === cfpassword) {
      //   const User = await prisma.user.create({
      //     data: {
      //       email,
      //       name: user,
      //       hashedPassword,
      //       image: "",
      //     },
      //   });
        // return res.status(200).json("'asd");
        return res.status(201).json("asd");
      } else {
        return res.status(401).json({ error: "Incorrect Password" });
      }
    }
  // } catch (error) {
  //   return res.status(405).json("asdsa");
  // }
// }
