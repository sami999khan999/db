import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../../prisma/generated/prisma/client";

const DB_NAME = process.env.POSTGRES_DB!;
const DB_USER = process.env.POSTGRES_USER!;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD!;
const DB_HOST = process.env.POSTGRES_HOST!;
const DB_PORT = process.env.POSTGRES_PORT!;
const DB_SCHEMA = process.env.DB_SCHEMA || "public";

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}`;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const addaper = new PrismaPg({
  connectionString: DATABASE_URL,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: addaper,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
