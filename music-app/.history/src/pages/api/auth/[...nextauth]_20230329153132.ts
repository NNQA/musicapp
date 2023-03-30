import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '@/server/prisma'
import CredentialsProvider from "next-auth/providers/credentials"
import {compare} from 'bcrypt'
import { use } from 'react'
import { debug } from 'console'


export default NextAuth({
    providers: [
        CredentialsProvider({
            type:"credentials",
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
                    return null;
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
                    return null;
                }
                return user;
            },
            
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
    ],
    // pages: {
    //     signIn:'/login'
    // },
    
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy:'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXT_SECRET,    
})