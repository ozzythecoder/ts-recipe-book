"use client";
import { Recipe } from "@prisma/client";
import { useState } from "react";
import { getRecipesById } from "@/lib/fetch";

interface Props extends React.PropsWithChildren {
  recipes?: Recipe[];
}

function RecipeDisplay({ recipes, children }: Props) {
  const [searchIdIn, setSearchId] = useState<string>("");
  const [stuff, setStuff] = useState<any>();

  const handleFetch = async () => {
    try {
      const data = await getRecipesById(searchIdIn);
      data ? setStuff(JSON.stringify(data)) : setStuff("Nothing found");
    } catch (e) {
      console.log(e);
      setStuff("Error");
    }
  };

  return (
    <>
      {recipes?.map((recipe: Recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>Prep time: {recipe.prepTime}</p>
          <p>Cook time: {recipe.cookTime}</p>
        </div>
      ))}
      <input
        type="text"
        value={searchIdIn}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleFetch}>Get recipe data</button>
      {stuff}
    </>
  );
}

export default RecipeDisplay;
