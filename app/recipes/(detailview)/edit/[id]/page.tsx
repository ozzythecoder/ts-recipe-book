import { db } from "@/lib/db";
import RecipeForm from "@components/RecipeForm";

interface Props {
  params: { id: string }
}

export default async function AddRecipePage({ params }: Props) {

  const recipe = await db.recipe.findFirst({
    where: {
      id: {
        equals: parseInt(params.id),
      },
    },
    include: {
      ingredients: {
        include: {
          ingredient: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  
  const ingredients = await db.ingredient.findMany();

  return (
    <main>
      <RecipeForm ingredients={ingredients} recipeToEdit={recipe} />
    </main>
  )
}