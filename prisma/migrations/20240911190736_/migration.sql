-- DropForeignKey
ALTER TABLE "FileManager" DROP CONSTRAINT "FileManager_parentId_fkey";

-- DropIndex
DROP INDEX "FileManager_parentId_key";

-- CreateTable
CREATE TABLE "_Parent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Parent_AB_unique" ON "_Parent"("A", "B");

-- CreateIndex
CREATE INDEX "_Parent_B_index" ON "_Parent"("B");

-- AddForeignKey
ALTER TABLE "_Parent" ADD CONSTRAINT "_Parent_A_fkey" FOREIGN KEY ("A") REFERENCES "FileManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Parent" ADD CONSTRAINT "_Parent_B_fkey" FOREIGN KEY ("B") REFERENCES "FileManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;
