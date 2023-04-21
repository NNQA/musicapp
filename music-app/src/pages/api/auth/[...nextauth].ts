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
import { generateJwt } from "./generateJwt";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Adapter } from "next-auth/adapters";

// async function refreshAccessToken(token: any) {
//   try {
//     const url =
//       "https://localhost:3000/token?" +
//       new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID as string,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       });

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
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
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },

  debug: process.env.NODE_ENV === "development",
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
    // async encode(params: JWTEncodeParams): Promise<string> {
    //   if (params.token !== undefined) {
    //     const encodedToken = jwt.sign(params?.token, params.secret);
    //     return encodedToken;
    //   }
    //   throw new Error("Invalid token");
    // },
    // async decode(params: JWTDecodeParams): Promise<JwtPayload> {
    //   if (params.token !== undefined) {
    //     const decodedToken = jwt.verify(
    //       params?.token,
    //       params.secret
    //     ) as JwtPayload;
    //     return decodedToken;
    //   }
    //   throw new Error("Invalid token");
    // },
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
