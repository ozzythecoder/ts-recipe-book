import Link from "next/link";

import AddRecipeForm from "@comp/AddRecipeForm";

export default async function RecipeAdd() {

  const res = await fetch('http://localhost:3000/api/ingredient')
  const ingredientInitial = await res.json()

  return (
    <main>
      <AddRecipeForm
        ingredientInitial={ingredientInitial}
      />
      <Link href="/recipes">Go back</Link>
    </main>
  )
}