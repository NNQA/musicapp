import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma";
import { transporter } from "@/lib/utilts/nodemailer";
import {} from "crypto-js"
import { data } from "@/components/elements/Form/data";

const serverName = process.env.EMAIL_SERVER_USER;
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        console.log("asdsad");
        const { email } = req.body;
        const Retriev = await Retrievpassword(email);
        if (Retriev?.error) {
          return res.status(401).json({ message: Retriev.message });
        }
        return res.status(200).json(Retriev);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}

async function Retrievpassword(email: string) {
  console.log("asdasd");
  const existUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(existUser)
  if (existUser === null) {
    return {
      error: true,
      message: "Your email is not valid, please enter the correct email",
    };
  }

  const password: string = "123";

  const hashedPassword = await bcrypt.hash(password, 12);
  const User: any = await prisma.user.update({
    where: {
        email: email,
    },
    data: {
        hashedPassword: hashedPassword,
    }
  });
  const mailOption = {
    from: serverName,
    to: email,
  };
  try {
    await transporter.sendMail({
      ...mailOption,
      text: "asdasd",
      html: '<p>Your new password is "123"</p><a href="http://localhost:3000/login" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Go to Login</a>',
    });
  } catch (e) {
    console.log(e);
  }
  return User
}
