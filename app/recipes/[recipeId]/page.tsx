import { getRecipesById } from "@/lib/fetch";
import { Recipe } from "@prisma/client";

interface Props extends React.PropsWithChildren {
  recipe: Recipe
  params: {
    recipeId: string;
  }
}

export default async function RecipeDetail ({ params }: Props) {
  
  const { recipeId } = params;

  const recipe = await getRecipesById(recipeId)

  return (
    <div>
      {JSON.stringify(recipe)}
    </div>
  )

}
