import { db } from "@/lib/db";
import RecipeContent from "@components/RecipeContent";
import Card from "@ui/Card";

interface Params {
  id: string;
}

interface Props extends React.PropsWithChildren {
  params: Params;
}

export default async function RecipeView({ params }: Props) {
  const recipe = await db.recipe.findFirst({
    where: {
      id: {
        equals: parseInt(params.id),
      },
    },
  });

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
