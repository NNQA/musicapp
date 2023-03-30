import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prisma";

export default async function handle(
    req: NextApiRequest, 
    res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const {email,
            user,
            password,
            cfpassword,} = req.body;
    } catch (error) {

    }
}