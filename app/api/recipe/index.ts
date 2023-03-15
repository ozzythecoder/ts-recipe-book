import { db } from "@/lib/db";
import { GET as fetchRecipes } from "./route"
import { GET as fetchRecipeById } from "./[id]/route";

const getRecipes = async () => {
  const data = await fetchRecipes();
  return data.json();
}

const getRecipeById = async(id: number) => {
  
  const recipe = await db.recipe.findUnique({
    where: {
      id: id
    }
  })

  return recipe;
}

export { getRecipes, getRecipeById };