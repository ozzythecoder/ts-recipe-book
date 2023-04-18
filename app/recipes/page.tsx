import { db } from "@/lib/db"
import Card from "@ui/Card"

export default async function RecipeView() {
  const recipes = await db.recipe.findMany();

  return (
    <>
      {recipes.map(recipe => (
        <Card>
          {JSON.stringify(recipe)}
        </Card>
      ))}
    </>
  )

}