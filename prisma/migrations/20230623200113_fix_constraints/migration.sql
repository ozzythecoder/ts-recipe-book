/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RecipesIngredients" DROP CONSTRAINT "RecipesIngredients_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "rating" SET DEFAULT 3;

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- AddForeignKey
ALTER TABLE "RecipesIngredients" ADD CONSTRAINT "RecipesIngredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
