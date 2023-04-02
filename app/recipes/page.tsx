import Link from "next/link";

import { getRecipes } from "@/lib/fetch";
import { Recipe } from "@prisma/client";

import RecipePreview from "@comp/RecipePreview";

import Card from "@ui/Card";
import CardTable from "@ui/CardTable";

export default async function Recipes() {
  const recipes: Recipe[] = await getRecipes();

  return (
    <main>
      <CardTable>
        {recipes?.map((recipe: Recipe) => (
            <RecipePreview recipe={recipe} key={recipe.id} />
        ))}
        <Link href="/recipes/add">
          <Card className="center-content" clickable={true}>
            <h3>
              + Add Recipe
            </h3>
          </Card>
        </Link>
      </CardTable>
    </main>
  );
}
