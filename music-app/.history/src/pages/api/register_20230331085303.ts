import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma";


export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    try {
        const { email,
            user,
            password,
            cfpassword, } = req.body;
        const existUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        
        if(existUser) {
            return res.status(422).json({error: 'Email taken'});
        }

        const hashedPassword = await bcrypt.hash(password,12);
        if(password === cfpassword) {
            console.log("a");
            const User = await prisma.user.create({
                data: {
                    email,
                    name: user,
                    hashedPassword,
                    image: '',
                }
            })
            return res.status(200).json(User);
        } else {
            return res.status(401).json({error:'Incorrect Password'});
        }
    } catch (error) {

    }
}