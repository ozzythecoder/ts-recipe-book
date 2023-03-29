import { createContext } from "react";

export const DatabaseContext = createContext(null);

export const NewRecipeContext = createContext({
  title: "",
  rating: "",
  prepTime: "",
  cookTime: "",
  ingredients: [],
  instructions: [],
});
