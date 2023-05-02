import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { use } from "react";
import { debug } from "console";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";
import { Jwt } from "jsonwebtoken";
import { setCookie } from "nookies";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Adapter } from "next-auth/adapters";

interface CustomSession {
  user: User & { id: number }
  expires: string
}
const secret = process.env.NEXTAUTH_SECRET;
type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string || '',
      clientSecret: process.env.GOOGLE_SECRET as string || '',
    }),
    CredentialsProvider({
      type: "credentials",
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.log("asdasd");
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log("first");
        if (!user || !user.hashedPassword) {
          throw new Error("Email doesnt exist");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect Password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },

  debug: process.env.NODE_ENV === "production",
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     if (session?.user) {
        
  //     }
  //     return session;
  //   },
  // }
  jwt: {
   secret: process.env.NEXTAUTH_JWT_SECRET,
  },

  secret: secret,
});
// async jwt({ token, user, account }: any) {
//   // if (account && user) {
//   //   return {
//   //     accessToken: account.accessToken,
//   //     accessTokenExpires: Date.now() + account.expires_in * 1000,
//   //     refreshToken: account.refresh_token,
//   //     user,
//   //   };
//   // }
//   // if (Date.now() < token.accessTokenExpires) {
//   //   return token;
//   // }
//   // return refreshAccessToken(token);
// },
// async session({ session, token }: any) {
//   if (token) {
//     session.user = token.user;
//     session.accessToken = token.accessToken;
//     session.error = token.error;
//   }
//   return session;
// },
