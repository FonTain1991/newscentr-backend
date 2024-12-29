/*
  Warnings:

  - You are about to drop the column `isShown` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isShown",
ADD COLUMN     "isPublish" BOOLEAN NOT NULL DEFAULT false;
