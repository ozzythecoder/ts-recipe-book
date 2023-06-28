import { db } from "@/lib/db";
import RecipeForm from "@components/RecipeForm";

interface Props {}

export default async function AddRecipePage({}: Props) {

  const ingredients = await db.ingredient.findMany();

  return (
    <main>
      <RecipeForm ingredients={ingredients} />
    </main>
  )
}