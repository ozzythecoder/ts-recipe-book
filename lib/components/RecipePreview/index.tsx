import Link from "next/link";
import Card from "@ui/Card";

import type { Recipe } from "@prisma/client";

import { Star, Clock3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props {
  recipe: Recipe;
}

// Will show a card with a short preview of the recipe
// Can be clicked on to go to full recipe
export default function RecipePreview({ recipe }: Props) {
  // Reusable recipe property
  const RecipeProperty = ({ Icon, text }: { Icon?: LucideIcon; text: string }) => (
    <div className="flex items-center">
      {Icon && <Icon className="inline mr-2" size={14} />}
      <p>{text}</p>
    </div>
  );

  // Creates an array of stars for the rating
  const rating = Array.from(Array(5), (_, idx) => <Star key={idx} className={`inline mr-[0.5] ${idx >= recipe.rating && "text-gray-300"}`} size={14} />);

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="hover:bg-gray-200 mobile:h-48 mobile:max-h-48">
        <h2 className="text-xl font-bold">{recipe.title}</h2>
        <RecipeProperty Icon={Clock3} text={`Prep ${recipe.prepTime} min`} />
        <RecipeProperty Icon={Clock3} text={`Cook ${recipe.cookTime} min`} />
        <p>{rating}</p>
        <p>{recipe.instructions.length} steps</p>
      </Card>
    </Link>
  );
}
