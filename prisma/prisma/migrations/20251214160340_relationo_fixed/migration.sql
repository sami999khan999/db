/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `favoritedById` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "categoryId",
DROP COLUMN "favoritedById";
