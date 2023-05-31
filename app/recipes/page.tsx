import { db } from "@/lib/db";
import type { Recipe } from "@prisma/client";
import { SearchContextProvider } from "@/lib/context/search";
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
        <SearchField />
        <RecipeList allRecipes={allRecipes} />
      </SearchContextProvider>
    </main>
  );
}
