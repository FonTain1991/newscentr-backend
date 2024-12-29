-- CreateEnum
CREATE TYPE "FileManagerType" AS ENUM ('IMAGE', 'FOLDER');

-- CreateTable
CREATE TABLE "FileManager" (
    "id" TEXT NOT NULL,
    "type" "FileManagerType" NOT NULL,
    "value" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "FileManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileManager_parentId_key" ON "FileManager"("parentId");

-- AddForeignKey
ALTER TABLE "FileManager" ADD CONSTRAINT "FileManager_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FileManager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
