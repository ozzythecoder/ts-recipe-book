import Card from "@ui/Card";
import type { Recipe } from "@prisma/client";

interface Props extends React.PropsWithChildren {
  recipe: Recipe;
}

// Will show a card with a short preview of the recipe
export default function RecipePreview({ recipe }: Props) {

  return (
    <Card>
      <h1>{recipe.title}</h1>
      <p>Prep time: {recipe.prepTime}</p>
      <p>Cook time: {recipe.cookTime}</p>
    </Card>
  )
}