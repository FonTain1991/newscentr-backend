-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "countSee" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "countSee" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "machineName" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_machineName_key" ON "Translation"("machineName");
