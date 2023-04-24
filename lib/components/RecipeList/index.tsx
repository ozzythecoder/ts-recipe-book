"use client";
import { useSearchContext } from "@/lib/context/search";
import RecipePreview from "@components/RecipePreview";
import { Recipe } from "@prisma/client";
import { useState } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipePreview recipe={recipe} />
      ))}
    </div>
  );
}
