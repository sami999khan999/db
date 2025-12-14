import { defineConfig } from "prisma/config";
import { config } from "dotenv";

config({ path: "./.env.local" });

const DB_NAME = process.env.POSTGRES_DB!;
const DB_USER = process.env.POSTGRES_USER!;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD!;
const DB_HOST = process.env.POSTGRES_HOST!;
const DB_PORT = process.env.POSTGRES_PORT!;
const DB_SCHEMA = process.env.DB_SCHEMA || "public";

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}`;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `tsx prisma/seed.ts`,
  },
  datasource: {
    url: DATABASE_URL,
  },
});
