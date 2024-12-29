-- DropForeignKey
ALTER TABLE "FileManager" DROP CONSTRAINT "FileManager_parentId_fkey";

-- AddForeignKey
ALTER TABLE "FileManager" ADD CONSTRAINT "FileManager_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FileManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;
