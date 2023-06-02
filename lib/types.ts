import type { Recipe, RecipesIngredients } from "@prisma/client";

export type RecipeWithIngredientNames = Recipe & {
  ingredients: (RecipesIngredients & {
    ingredient: {
      name: string;
    };
  })[];
}