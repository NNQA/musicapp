import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma";
import { transporter } from "@/lib/utilts/nodemailer";

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
        const { email, user, password, cfpassword } = req.body;
        const User = await createUser(email, user, password, cfpassword);
        if (User?.error) {
          return res.status(401).json({ message: User.message });
        }
        res.status(200).json(User);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;

    case "GET":
      try {
        const users = await getAllUsers();
        res.status(200).json(users);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;

    case "PUT":
      try {
        const { id, user, cloudinaryImage } = req.body;
        const User = await updateUserById(id, user, cloudinaryImage);
        res.status(200).json(User);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;
        const user = await deleteUserById(id);
        res.status(200).json(user);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
      break;

    default:
      res.status(400).json({ message: "Invalid method" });
      break;
  }
}

// Create a product
// async function createUser(
//   email: string,
//   user: string,
//   password: string,
//   cfpassword: string
// ): Promise<{ message?: string, error?: boolean } | any>{
//   const existUser = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   if (existUser) {
//     return { error: true, message: "Email already exists" };
//   }
//   const hashedPassword = await bcrypt.hash(password, 12);

//   const User: any = await prisma.user.create({
//     data: {
//       email,
//       name: user,
//       hashedPassword,
//       image: "",
//     },
//   });
//   return User;
// }
async function createUser(
  email: string,
  user: string,
  password: string,
  cfpassword: string
): Promise<{ message?: string; error?: boolean } | any> {
  const existUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existUser) {
    return { error: true, message: "Email already exists" };
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const User: any = await prisma.user.create({
    data: {
      email,
      name: user,
      hashedPassword,
      image: "",
    },
  });
  // const mailOption = {
  //   from: serverName,
  //   to: email,
  // };
  // try {
  //   await transporter.sendMail({
  //     ...mailOption,
  //     text: "asdasd",
  //     html: '<p>You have successfully registered, you need to login to experience our service:</p><a href="http://localhost:3000/login" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Go to Login</a>',
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
  return User;
}

// Get all products
async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

// Update a product by ID
async function updateUserById(id: string, name?: string, image?: string) {
  const Upuser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: name,
      image: image,
    },
  });
  return Upuser;
}

// Delete a product by ID
async function deleteUserById(id: string) {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
}
