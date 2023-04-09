import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/server/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        return res.status(405).end();
    }
    try {

    }
    catch() {
        
    }
}