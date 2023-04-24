import { db } from "@/lib/db";
import RecipePreview from "@components/RecipePreview";
import { SearchContextProvider } from "@/lib/context/search";
import SearchField from "@components/SearchField";
import RecipeList from "@components/RecipeList";

export default async function RecipeView() {
  const recipes = await db.recipe.findMany();



  return (
    <>
      <SearchContextProvider>
        <SearchField />
        <RecipeList />
        {recipes.map((recipe) => (
          <RecipePreview recipe={recipe} />
        ))}
      </SearchContextProvider>
    </>
  );
}
