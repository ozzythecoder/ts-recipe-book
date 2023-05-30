"use client";
import { useSearchContext } from "@/lib/context/search";
import RecipePreview from "@components/RecipePreview";
import { Recipe } from "@prisma/client";
import { useState } from "react";

export default function RecipeList({ allRecipes }: { allRecipes: Recipe[] }) {
  const { recipeSearchIn } = useSearchContext();

  const displayedRecipes = allRecipes.filter(({ title }) =>
    title.toLowerCase().includes(recipeSearchIn.toLowerCase())
  );

  return (
    <div>
      {displayedRecipes.map((recipe) => (
        <RecipePreview recipe={recipe} />
      ))}
    </div>
  );
}
