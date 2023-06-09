import NextAuth, { Theme } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer"


/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}

const PORT = Number(process.env.PORT ?? 587);
const secret = process.env.NEXTAUTH_SECRET;
export default NextAuth({
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
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
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },

  debug: process.env.NODE_ENV === "production",
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  
  jwt: {
   secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: secret,
});
