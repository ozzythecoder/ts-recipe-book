'use client';
import { Recipe } from "@prisma/client";
import { useState, useEffect } from "react";

interface Props extends React.PropsWithChildren {
  recipes?: Recipe[]
}

function RecipeDisplay({ recipes, children }: Props) {

  const [ searchIdIn, setSearchId ] = useState<string>();
  const [ stuff, setStuff ] = useState<any>();

  return (
    <>
      {recipes?.map((recipe: Recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>Prep time: {recipe.prepTime}</p>
          <p>Cook time: {recipe.cookTime}</p>
        </div>
      ))}
      <input type="text" value={searchIdIn} onChange={(e) => setSearchId(e.target.value)} />
      <button
        onClick={
          async () => {
            const dataRes = await fetch(`http://localhost:3000/api/recipe/${searchIdIn}`, { method: "GET" })
            const data = await dataRes.json()
            data ? setStuff(JSON.stringify(data)) : setStuff('No recipes found')
          }
        }
      >
        Get recipe data
      </button>
      {stuff}
    </>
  )
}

export default RecipeDisplay;