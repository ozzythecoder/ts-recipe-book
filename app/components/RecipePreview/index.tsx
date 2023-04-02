import { Recipe } from "@prisma/client";
import Card from "@ui/Card";

interface Props extends React.PropsWithChildren {
  recipe: Recipe
}

export default function RecipePreview({ recipe }: Props) {
  
  return (
    <Card clickable={true} key={recipe.id}>
      <h3>{recipe.title}</h3>
      <p>Prep time: {recipe.prepTime}</p>
      <p>Cook time: {recipe.cookTime}</p>
    </Card>
  );
}
