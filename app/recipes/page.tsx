import Link from "next/link";

import { getRecipes } from "@/lib/fetch";
import { Recipe } from "@prisma/client";
import RecipePreview from "../components/RecipePreview";
import CardTable from "../components/ui/CardTable";

export default async function Recipes() {
  const recipes: Recipe[] = await getRecipes();

  return (
    <main>
      <CardTable>
        {recipes.map((recipe: Recipe) => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
            <RecipePreview recipe={recipe} />
          </Link>
        ))}
      </CardTable>
    </main>
  );
}
