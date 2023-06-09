import { db } from "@/lib/db";
import RecipeContent from "@components/RecipeContent";
import Card from "@ui/Card";

interface Props {
  params: {id: string};
}

export default async function RecipeView({ params }: Props) {
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

  console.log(recipe)

  return (
    <main>
      <Card>
        {recipe ? (
          <RecipeContent recipe={recipe} />
        ) : (
          <p className="font-bold">
            Something went wrong. Please try again later.
          </p>
        )}
      </Card>
    </main>
  );
}
