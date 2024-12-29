-- DropForeignKey
ALTER TABLE "_Parent" DROP CONSTRAINT "_Parent_A_fkey";

-- DropForeignKey
ALTER TABLE "_Parent" DROP CONSTRAINT "_Parent_B_fkey";

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "previewId" TEXT,
    "previewAlt" JSONB,
    "previewTitle" JSONB,
    "iconId" TEXT,
    "title" JSONB NOT NULL,
    "description" JSONB,
    "parentId" TEXT,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "_Parent" ADD CONSTRAINT "_Parent_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Parent" ADD CONSTRAINT "_Parent_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
