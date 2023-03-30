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
    } catch (error) {

    }
}