/*
  Warnings:

  - Added the required column `name` to the `FileManager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileManager" ADD COLUMN     "name" TEXT NOT NULL;
