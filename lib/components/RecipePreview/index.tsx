import Link from "next/link";
import Card from "@ui/Card";
import type { Recipe } from "@prisma/client";

interface Props extends React.PropsWithChildren {
  recipe: Recipe;
}

// Will show a card with a short preview of the recipe
// Can be clicked on to go to full recipe
export default function RecipePreview({ recipe }: Props) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="hover:bg-gray-200 max-h-64 aspect-square">
        <h2 className="text-2xl font-bold">{recipe.title}</h2>
        <p>Prep time: {recipe.prepTime}</p>
        <p>Cook time: {recipe.cookTime}</p>
        <p className="md:hidden">Rated: {recipe.rating} / 5</p>
      </Card>
    </Link>
  );
}