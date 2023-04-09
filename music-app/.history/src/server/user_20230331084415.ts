import { prisma } from "./prisma"


export function getAlluser() {

    const user = await prisma.user.findMany() {
        where: {
            
        }
    }
}