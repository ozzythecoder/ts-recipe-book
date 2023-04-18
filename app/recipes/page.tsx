import { db } from "@/lib/db"
import RecipePreview from "@components/RecipePreview";
import Card from "@ui/Card"

export default async function RecipeView() {
  const recipes = await db.recipe.findMany();

  return (
    <>
      {recipes.map(recipe => (
        <RecipePreview recipe={recipe} />
      ))}
    </>
  )

}