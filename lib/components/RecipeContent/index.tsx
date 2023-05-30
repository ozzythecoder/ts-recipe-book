import { Recipe } from "@prisma/client";

interface Props extends React.PropsWithChildren {
  recipe: Recipe;
}

export default function RecipeContent({ recipe }: Props) {

  return (
    <section>
      <h2>{recipe.title}</h2>
      <p>Rating: {recipe.rating} / 5</p>
      <p>Prep time: {recipe.prepTime} minutes</p>
      <p>Cook time: {recipe.cookTime} minutes</p>
      <ol>
        {recipe.instructions?.map(step => (
            <li>{step}</li>
          ))
        }
      </ol>
    </section>
  )
}