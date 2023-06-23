import type { Recipe, RecipesIngredients } from "@prisma/client";

export type RecipeWithIngredientNames = Recipe & {
  ingredients: (RecipesIngredients & {
    ingredient: {
      name: string;
    };
  })[];
}

// Recipe type in form - will be coerced into proper shape in API
export interface FormData {
  title: string;
  rating: number;
  cookTime: string;
  prepTime: string;
  instructions: { step: string }[];
  ingredients: {
    name: string;
    amount: string;
    unit: string;
  }[];
}