import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { Prisma, PrismaClient } from "./generated/prisma/client";
import { config } from "dotenv";

config({ path: "./.env.local" });

const DB_NAME = process.env.POSTGRES_DB!;
const DB_USER = process.env.POSTGRES_USER!;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD!;
const DB_HOST = process.env.POSTGRES_HOST!;
const DB_PORT = process.env.POSTGRES_PORT!;
const DB_SCHEMA = process.env.DB_SCHEMA || "public";

const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}`;

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  const techCategory = await prisma.category.create({
    data: { name: "Technology" },
  });

  const lifeCategory = await prisma.category.create({
    data: { name: "Lifestyle" },
  });

  const alice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      newsLetter: true,
      writtedPosts: {
        create: [
          {
            title: "Join the Prisma Discord",
            description: "https://pris.ly/discord",
            categoryId: techCategory.id,
          },
          {
            title: "Prisma on YouTube",
            description: "https://pris.ly/youtube",
            categoryId: techCategory.id,
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@prisma.io",
      writtedPosts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            description: "https://www.twitter.com/prisma",
            categoryId: lifeCategory.id,
          },
        ],
      },
    },
  });

  const aliceFavorite = await prisma.posts.findFirst({
    where: { title: "Follow Prisma on Twitter" },
  });

  const bobFavorite = await prisma.posts.findFirst({
    where: { title: "Join the Prisma Discord" },
  });

  if (aliceFavorite) {
    await prisma.user.update({
      where: { id: alice.id },
      data: { favoritedPosts: { connect: { id: aliceFavorite.id } } },
    });
  }

  if (bobFavorite) {
    await prisma.user.update({
      where: { id: bob.id },
      data: { favoritedPosts: { connect: { id: bobFavorite.id } } },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
