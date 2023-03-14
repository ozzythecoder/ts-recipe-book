import { Recipe } from "@prisma/client"
import { getRecipes } from "@api/recipe";

export default async function Home() {

  const { data } = await getRecipes();

  return (
    <main>
      {data.map((recipe: Recipe) => (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
          <p>Cook time: {recipe.cookTime}</p>
        </div>
      )) }
    </main>
  )
}
