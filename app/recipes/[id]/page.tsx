import RecipeContent from "@components/RecipeContent";
import { Recipe } from "@prisma/client";

interface Params { id: string; }

interface Props extends React.PropsWithChildren {
  params: Params;
}

export default async function RecipeView({ params }: Props) {

  const data = await fetch(`http://localhost:3000/api/recipe/${params.id}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const recipe = await data.json()

  return recipe ? (
    <>
      <RecipeContent recipe={recipe} />
    </>
  ) : (
    <>Loading....</>
  )
}
