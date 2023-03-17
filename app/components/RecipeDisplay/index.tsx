"use client";
import { Recipe } from "@prisma/client";
import { useState } from "react";
import { getRecipesById } from "@/lib/fetch";

import CardTable from "@ui/CardTable";
import RecipePreview from "../RecipePreview";

interface Props extends React.PropsWithChildren {
  recipes?: Recipe[];
}

function RecipeDisplay({ recipes, children }: Props) {

  return (
    <>
      <CardTable>
        {recipes?.map((recipe: Recipe) => (
          <RecipePreview key={recipe.id} recipe={recipe} />
        ))}
      </CardTable>
    </>
  );
}

export default RecipeDisplay;
