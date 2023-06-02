import Link from "next/link";
import Card from "@ui/Card";

import type { Recipe } from "@prisma/client";
import type { IconType } from "react-icons";

import { BiTime, BiStar, } from "react-icons/bi";

interface Props extends React.PropsWithChildren {
  recipe: Recipe;
}

// Will show a card with a short preview of the recipe
// Can be clicked on to go to full recipe
export default function RecipePreview({ recipe }: Props) {

  const RecipeProperty = ({ Icon, text }: {Icon?: IconType, text: string}) => (
    <div className="flex items-center">
      {Icon && <Icon className="inline mr-2" />}
      <p>{text}</p>
    </div>
  )

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="hover:bg-gray-200 mobile:h-48 mobile:max-h-48">
        <h2 className="text-xl font-bold">{recipe.title}</h2>
        <RecipeProperty Icon={BiTime} text={`Prep ${recipe.prepTime} min`} />
        <RecipeProperty Icon={BiTime} text={`Cook ${recipe.cookTime} min`} />
        <RecipeProperty Icon={BiStar} text={`${recipe.rating} / 5`} />
        <p>{recipe.instructions.length} steps</p>
      </Card>
    </Link>
  );
}
