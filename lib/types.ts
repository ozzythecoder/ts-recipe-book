import type { Recipe, RecipesIngredients } from "@prisma/client";

export type RecipeWithIngredientNames = Recipe & {
  ingredients: (RecipesIngredients & {
    ingredient: {
      name: string;
    };
  })[];
}

export interface FormData extends Omit<Recipe, "instructions" | "id"> {
  instructions: { step: string }[];
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
}