import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '@/server/prisma'
import Credentials from 'next-auth/providers/credentials'
import compare from 'bcrypt'
import { use } from 'react'


export default NextAuth({
    providers: [
        Credentials({
            id:"credentials",
            name:"credentials",
            credentials: {
                email: {
                    label:"Email",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if(!user || !user.hashedPassword) {
                    throw new Error('Email doesnt exist');
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                if(!isCorrectPassword) {
                    throw new Error('Incorrect Password');
                }
            },
            
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
    ],
    // pages: {
    //     signIn:'/login/index'
    // }
    // callbacks: {
    //     session: async ({session, user}) => {
    //         session.id = user.id;
    //         return Promise.resolve(session);
    //     }
    // }
})