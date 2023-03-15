import { Recipe } from "@prisma/client";
import { getRecipes, getRecipeById } from "@api/recipe";
import RecipeDisplay from "@comp/RecipeDisplay";

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>

      <div>
        <RecipeDisplay recipes={recipes} />
      </div>
    </main>
  );
}
