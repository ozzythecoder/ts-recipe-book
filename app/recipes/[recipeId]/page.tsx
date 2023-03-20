import Link from "next/link";

import { getRecipesById } from "@/lib/fetch";
import { Recipe } from "@prisma/client";
import Card from "@ui/Card";

interface Props extends React.PropsWithChildren {
  params: {
    recipeId: string;
  };
}

export default async function RecipeDetail({ params }: Props) {
  const { recipeId } = params;

  const recipe: Recipe = await getRecipesById(recipeId);

  return (
    <section
      style={{ margin: '20px auto', textAlign: 'center' }}
    >
      <Card
        style={{ margin: '0 auto', minWidth: '40%', textAlign: 'initial' }}
      >
        <h1>{recipe.title}</h1>
        <p>Rating: {recipe.rating} / 5</p>
        <p>Prep Time: {recipe.prepTime} minutes</p>
        <p>Cook Time: {recipe.cookTime} minutes</p>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </Card>
      <Link href="/recipes">Back to recipes</Link>
    </section>
  );
}
