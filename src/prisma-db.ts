import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

export const connect = () => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
};

export default prismaClient;
