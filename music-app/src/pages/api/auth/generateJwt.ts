import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
const secret = process.env.NEXTAUTH_SECRET;

export const generateJwt = (user: any): string => {
  if (secret === undefined) {
    throw new Error("Secret is not defined");
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    secret,
    { expiresIn: "1h" }
  );
  return token;
};
