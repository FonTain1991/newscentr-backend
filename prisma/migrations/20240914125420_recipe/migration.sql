-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "pageName" JSONB NOT NULL,
    "pageTitle" JSONB NOT NULL,
    "url" TEXT NOT NULL,
    "text" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isPublish" BOOLEAN NOT NULL DEFAULT false,
    "recipeCategoryId" TEXT NOT NULL,
    "keywords" JSONB,
    "description" JSONB,
    "previewId" TEXT,
    "previewAlt" JSONB,
    "previewTitle" JSONB,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "url" TEXT NOT NULL,
    "parentId" TEXT,
    "keywords" JSONB,
    "description" JSONB,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCategory_parentId_key" ON "RecipeCategory"("parentId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipeCategoryId_fkey" FOREIGN KEY ("recipeCategoryId") REFERENCES "RecipeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "RecipeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
