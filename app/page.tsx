import { Recipe } from "@prisma/client"
import { GET as getRecipes } from "./api/recipe/route"

const getData = async () => {
  const data = await getRecipes()
  return data.json();
}


export default async function Home() {

  const { data } = await getData();

  return (
    <main>
      {data.map((recipe: Recipe) => (
        <>
          <h1>{recipe.title}</h1>
          <p>Cook time: {recipe.cookTime}</p>
        </>
      )) }
    </main>
  )
}
