import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";

import { Prisma } from "@prisma/client";
import { prisma } from "@/server/prisma";
import Email from "next-auth/providers/email";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  console.log(currentUser);
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return {currentUser};
};

export default serverAuth