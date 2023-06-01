"use client";
import { useSearchContext } from "@/lib/context/search";
import RecipePreview from "@components/RecipePreview";
import { Recipe } from "@prisma/client";

import CardRow from "@ui/CardRow";

export default function RecipeList({ allRecipes }: { allRecipes: Recipe[] }) {
  const { recipeSearchIn } = useSearchContext();

  const displayedRecipes = allRecipes.filter(({ title }) =>
    title.toLowerCase().includes(recipeSearchIn.toLowerCase())
  );

  return (
    <CardRow>
      {displayedRecipes.map((recipe) => (
        <RecipePreview recipe={recipe} />
      ))}
    </CardRow>
  );
}
