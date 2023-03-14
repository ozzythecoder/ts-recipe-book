import { GET } from "./route"

export const getRecipes = async () => {
  const recipes = await GET();
  return recipes.json();
}