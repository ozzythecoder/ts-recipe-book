import { Ingredient } from "@prisma/client";

export interface DetailedIngredient extends Ingredient {
  amount: string;
  unit: string;
}