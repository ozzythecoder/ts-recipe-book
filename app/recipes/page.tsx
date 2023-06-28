export const dynamic = "force-dynamic"

import { db } from "@/lib/db";
import type { Recipe } from "@prisma/client";
import { SearchContextProvider } from "@/lib/context/search";

import AddRecipeButton from "@components/AddRecipeButton";
import SearchField from "@components/SearchField";
import RecipeList from "@components/RecipeList";

export default async function RecipeView() {
  // Fetch recipes and fake network latency
  const getRecipes = async (): Promise<Recipe[]> => {
    const res = await db.recipe.findMany({ orderBy: { title: 'asc' } });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return res;
  }

  const allRecipes = await getRecipes();

  return (
    <main>
      <SearchContextProvider>
        <div className="flex flex-col-reverse md:flex-row place-items-center align-middle justify-between px-2 md:px-8 py-4 gap-4 mb-4 bg-gray-300 rounded-md">
          <SearchField />
          <AddRecipeButton />
        </div>
        <RecipeList allRecipes={allRecipes} />
      </SearchContextProvider>
    </main>
  );
}
