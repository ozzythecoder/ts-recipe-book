import Link from "next/link";
import Card from "@ui/Card";
import type { Recipe } from "@prisma/client";
import { BiTime, BiStar } from 'react-icons/bi';

interface Props extends React.PropsWithChildren {
  recipe: Recipe;
}

// Will show a card with a short preview of the recipe
// Can be clicked on to go to full recipe
export default function RecipePreview({ recipe }: Props) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="hover:bg-gray-200 max-h-64 md:aspect-square overflow-scroll">
        <h2 className="text-xl font-bold">{recipe.title}</h2>
        <p><BiTime className="inline" /> Prep {recipe.prepTime} min</p>
        <p><BiTime className="inline" /> Cook {recipe.cookTime} min</p>
        <p>{recipe.instructions.length} steps</p>
        <p className="md:hidden"><BiStar className="inline" /> Rated: {recipe.rating} / 5</p>
      </Card>
    </Link>
  );
}