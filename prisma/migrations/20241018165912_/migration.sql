/*
  Warnings:

  - You are about to drop the column `recipeIngredientId` on the `Ingredient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ingredientId]` on the table `RecipeIngredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeIngredientId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "recipeIngredientId";

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_ingredientId_key" ON "RecipeIngredient"("ingredientId");

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
