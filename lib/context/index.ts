import { useContext, createContext } from "react";

export const DatabaseContext = createContext(null);

const NewRecipeContext = createContext(null);

export const useRecipeForm = () => {
  return useContext(NewRecipeContext)
}
