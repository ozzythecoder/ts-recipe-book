import { Recipe } from "@prisma/client";

interface Props extends React.PropsWithChildren {
  recipe: Recipe;
}

export default function RecipeContent({ recipe }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">{recipe.title}</h2>
      <p>Rating: {recipe.rating} / 5</p>
      <p>Prep time: {recipe.prepTime} minutes</p>
      <p>Cook time: {recipe.cookTime} minutes</p>
      <div className="divide-y divide-dashed divide-gray-300">
        <div className="pb-2"></div>
        <div>
          <p className="text-bold">Ingredients:</p>
          <ul className="list-disc list-inside">

          </ul>
        </div>
        <ol className="pt-2 list-decimal list-inside">
          {recipe.instructions?.map((step) => (
            <li>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
