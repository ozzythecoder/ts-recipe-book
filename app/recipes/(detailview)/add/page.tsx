import { db } from "@/lib/db";
import AddRecipeForm from "@components/AddRecipeForm";

interface Props {}

export default async function AddRecipePage({}: Props) {

  const ingredients = await db.ingredient.findMany();

  return (
    <main>
      <AddRecipeForm initIngredients={ingredients} />
    </main>
  )
} 