import { getRecipes } from "@/lib/fetch";
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
