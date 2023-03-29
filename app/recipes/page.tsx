import Link from "next/link";

import { getRecipes } from "@/lib/fetch";
import { Recipe } from "@prisma/client";

import RecipePreview from "@comp/RecipePreview";

import CardTable from "@ui/CardTable";

export default async function Recipes() {
  const recipes: Recipe[] = await getRecipes();

  return (
    <main>
      <Link href="/recipes/add">Add Recipe</Link>
      <CardTable>
        {recipes?.map((recipe: Recipe) => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id}>
            <RecipePreview recipe={recipe} />
          </Link>
        ))}
      </CardTable>
    </main>
  );
}
