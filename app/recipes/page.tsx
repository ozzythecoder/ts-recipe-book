import { Suspense } from "react";
import { db } from "@/lib/db";
import RecipePreview from "@components/RecipePreview";
import { SearchContextProvider } from "@/lib/context/search";
import SearchField from "@components/SearchField";
import RecipeList from "@components/RecipeList";

export default async function RecipeView() {

  const allRecipes = await db.recipe.findMany();

  return (
    <>
      <SearchContextProvider>
        <SearchField />
        <Suspense fallback={<h1>Loading...</h1>}>
          <RecipeList allRecipes={allRecipes} />
        </Suspense>
      </SearchContextProvider>
    </>
  );
}
