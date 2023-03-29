import { Ingredient } from "@prisma/client";

export interface DetailedIngredient extends Ingredient {
  amount: string;
  unit: string;
}

export interface AddRecipeFormType {
  title: string,
  rating: string,
  prepTime: string,
  cookTime: string,
  instructions: string[],
}