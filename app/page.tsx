"use server";
import { Recipe } from "@prisma/client";
import { getRecipes, getRecipeById } from "@api/recipe";
import RecipeSearch from "./recipe-search";
import { CLIENT_STATIC_FILES_RUNTIME_WEBPACK } from "next/dist/shared/lib/constants";

const recipeSearch = async (searchId: number) => {
  const recipe = await getRecipeById(searchId)
  return recipe ? recipe.json() : 'No recipe found'
}

export default async function Home() {
  const recipes = await getRecipes();

  const RecipeSearchButton = () => {
    return (
      <>
        <button>yeah</button>
      </>
    );
  };

  return (
    <main>
      {/* {recipes.map((recipe: Recipe) => (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
          <p>Cook time: {recipe.cookTime}</p>
        </div>
      )) } */}

      <div>
        <RecipeSearch />
      </div>
      <div></div>
    </main>
  );
}
