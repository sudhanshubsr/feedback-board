import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

if (!global.prisma) {
  global.prisma = prismaClientSingleton();
}

const prisma = global.prisma;

export default prisma;

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;