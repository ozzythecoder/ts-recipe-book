import Link from "next/link";

import AddRecipeForm from "@comp/AddRecipeForm";

export default function RecipeAdd() {

  return (
    <main>
      <AddRecipeForm
        url="http://localhost:3000/api/recipe"
      />
      <Link href="/recipes">Go back</Link>
    </main>
  )
}