import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "./prisma";

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({req});
    

    
}