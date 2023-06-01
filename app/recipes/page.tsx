import { db } from "@/lib/db";
import Button from "@ui/Button";
import type { Recipe } from "@prisma/client";
import { SearchContextProvider } from "@/lib/context/search";

import AddRecipeButton from "@components/AddRecipeButton";
import SearchField from "@components/SearchField";
import RecipeList from "@components/RecipeList";

export default async function RecipeView() {
  // Fetch recipes and fake network latency
  const getRecipes = async (): Promise<Recipe[]> => {
    const res = await db.recipe.findMany();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return res;
  };

  const allRecipes = await getRecipes();

  return (
    <main>
      <SearchContextProvider>
        <div className="flex flex-row place-items-center justify-between md:px-8 mb-6 bg-gray-300 rounded-md">
          <SearchField />
          <AddRecipeButton />
        </div>
        <RecipeList allRecipes={allRecipes} />
      </SearchContextProvider>
    </main>
  );
}
